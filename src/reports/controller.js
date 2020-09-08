import mongoose from 'mongoose';
import Order from '../orders/model.js';
import pdfMake from 'pdfmake/build/pdfmake.js';
import vfsFonts from 'pdfmake/build/vfs_fonts.js'

pdfMake.vfs = vfsFonts.pdfMake.vfs;



exports.getReports = (req, res) => {
    Order.findOne({"invoiceNumber": req.params.invoiceNumber })
    .then(order => {
        console.log(order)
        let rows = [];
        rows.push( ['No.', 'Item', 'Price', 'Qty', 'Tax', 'Total']);
        console.log(rows, '0000')
        // for(let [i, item] of order.listItems){
        //     console.log(item, 'ITEMS')
            
        // };

        for(let i=0; i<=order.listItems.length-1; i++){
            console.log(order.listItems[i].name)
            rows.push(['#.'+i, order.listItems[i].name, order.listItems[i].amount, '*', order.listItems[i].tax, order.listItems[i].amount]);
        }
        let totalTaxAmount, subTotal;
        totalTaxAmount = order.listItems.reduce((acc, item) => {
            return acc + item.tax
        }, 0);
        subTotal =  order.listItems.reduce((acc, item) => {
            return acc + item.amount
        }, 0);

        let totalAmount = (subTotal + totalTaxAmount)
        
        rows.push(['', '', '', '', 'Total', totalAmount])
            const pdfDocuments = {
                content:[
                    {text: 'INVOICE', style: 'header'},
                    {
                        table: {
                            widths: ['*', 100, '*', '*', '*', "*"],
                            body: rows
                        },
                        style: 'tableExample'
                    },
                ],
                styles: {
                    header:{
                        alignment: 'center',
                        fontSize: 18,
                        bold: true,
                        margin: [100, 0, 30, 0]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                }
            };
    
            const pdfDoc = pdfMake.createPdf(pdfDocuments);
            pdfDoc.getBase64((data) => {
                res.writeHead(200,
                    {
                        'Content-Type':'application/pdf',
                        'Content-Disposition':'attachment;filename="filename.pdf"'
                    });
                const download = Buffer.from(data.toString('utf-8'), 'base64');
                res.end(download)
            })
    })
    .catch(err => {
        res
        .status(500)
    })

}