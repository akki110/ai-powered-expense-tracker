const Export = require('../models/export.model.js');
const Expense = require('../models/expense.model.js');
const Budget = require('../models/budget.model.js');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const exportsDir = path.join(__dirname, '../../public/exports');
if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

exports.generateExport = async (userId, exportParams) => {
    const { dataScope, format, startDate, endDate } = exportParams;
    let data = [];
    
    let query = { user: userId };
    if (startDate && endDate) {
        query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    
    if (dataScope === 'all' || dataScope === 'expenses') {
        const expenses = await Expense.find(query).sort({ date: -1 });
        data = expenses.map(e => ({
            Type: 'Expense',
            Date: e.date ? e.date.toISOString().split('T')[0] : '',
            Category: e.category,
            Merchant: e.merchant,
            Amount: e.amount,
            Detail: e.detail || ''
        }));
    }
    
    if (dataScope === 'all' || dataScope === 'budgets') {
        const budgets = await Budget.find({ user: userId });
        data = [
            ...data,
            ...budgets.map(b => ({
                Type: 'Budget',
                Date: b.createdAt ? b.createdAt.toISOString().split('T')[0] : '',
                Category: b.category,
                Merchant: 'N/A',
                Amount: b.limit,
                Detail: `${b.period} limit`
            }))
        ];
    }
    
    if (data.length === 0) {
        data.push({ Type: 'N/A', Date: 'N/A', Category: 'N/A', Merchant: 'N/A', Amount: 0, Detail: 'No records found' });
    }

    const fileId = crypto.randomBytes(4).toString('hex');
    const fileName = `Export_${dataScope}_${fileId}.${format}`;
    const filePath = path.join(exportsDir, fileName);
    
    if (format === 'csv') {
        const parser = new Parser();
        const csv = parser.parse(data);
        fs.writeFileSync(filePath, csv);
    } else if (format === 'pdf') {
        await new Promise((resolve, reject) => {
            const doc = new PDFDocument({ margin: 30 });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            
            doc.fontSize(16).text('Financial Export Report', { align: 'center' });
            doc.moveDown();
            
            data.forEach(item => {
                doc.fontSize(10).text(`${item.Date} | ${item.Type} | ${item.Category} | ${item.Merchant} | $${item.Amount} | ${item.Detail}`);
                doc.moveDown(0.5);
            });
            
            doc.end();
            stream.on('finish', resolve);
            stream.on('error', reject);
        });
    }
    
    const stats = fs.statSync(filePath);
    const sizeStr = formatBytes(stats.size);
    
    const exportRecord = await Export.create({
        user: userId,
        name: `Export_${dataScope.toUpperCase()}`,
        type: format,
        size: sizeStr,
        filePath: `/exports/${fileName}`
    });
    
    return exportRecord;
};

exports.getRecentExports = async (userId) => {
    return await Export.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
};
