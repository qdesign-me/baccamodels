import React from 'react';
import pdfMake from 'pdfmake';
import { convertMetric } from 'hooks/utils';
const formatParam = (key, value) => {
  if (['Height', 'Bust', 'Waist', 'Hips'].includes(key)) return `${value} / ${convertMetric(value, 'feet')}`;
  if (['Shoes'].includes(key)) return `${value} / ${convertMetric(value, 'shoes')}`;
  return value;
};
export default async function handler(req, res) {
  const response = await fetch(`${process.env.HOST}/api/model/details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json());

  //console.log('response', response.data.model.profile.book);
  const phone = response.data.info.phone;
  const address = response.data.info.address.replace(/(\r\n|\n|\r)/gm, ', ');
  const fonts = {
    Julius: {
      normal: 'public/fonts/Julius-Sans-One.ttf',
      bold: 'public/fonts/Julius-Sans-One.ttf',
      italics: 'public/fonts/Julius-Sans-One.ttf',
      bolditalics: 'public/fonts/Julius-Sans-One.ttf',
    },
    Roboto: {
      normal: 'public/fonts/Roboto-Regular.ttf',
      bold: 'public/fonts/Roboto-Medium.ttf',
      italics: 'public/fonts/Roboto-Italic.ttf',
      bolditalics: 'public/fonts/Roboto-MediumItalic.ttf',
    },
  };
  const docDefinition = {
    content: [
      {
        layout: {
          defaultBorder: false,
          paddingLeft: function (i, node) {
            return 0;
          },
          paddingRight: function (i, node) {
            return 0;
          },
          paddingTop: function (i, node) {
            return 0;
          },
          paddingBottom: function (i, node) {
            return 0;
          },
        },
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 0,
          widths: ['*', '*'],

          body: [],
        },
      },
    ],
    styles: {
      name: {
        fontSize: 20,
        bold: true,
        alignment: 'center',
        font: 'Julius',
      },
      portfolio: {
        fontSize: 14,
        color: '#676767',
        alignment: 'center',
      },
      paramkey: {
        fontSize: 12,
        color: '#676767',
        alignment: 'center',
      },
      paramvalue: {
        fontSize: 12,

        alignment: 'center',
      },
      bold: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      small: {
        fontSize: 10,
        alignment: 'center',
      },
      padded: {
        marginTop: 15,
      },
    },
    defaultStyle: {
      columnGap: 0,
      font: 'Julius',
    },
    pageOrientation: 'landscape',
    pageMargins: [40, 20, 40, 10],
  };

  const addFooter = () => {
    docDefinition.content[0]['table']['body'].push([
      {
        image: `${process.cwd()}/public/images/logo.png`,
        width: 150,
        alignment: 'center',
        style: 'padded',
      },
      {
        text: [{ text: 'Bacca Model Management'.toUpperCase(), style: 'bold' }, `\n`, { text: `${address}\n${phone}\ - bacca-models.com`, style: 'small' }],
        style: 'padded',
      },
    ]);
  };
  const params = [];

  if (response.data.model.profile?.params) {
    Object.keys(response.data.model.profile.params).map((key, index) => {
      if (['Height', 'Bust', 'Waist', 'Hips', 'Shoe', 'Hair', 'Eyes'].includes(key)) {
        params.push({ text: key.toUpperCase(), style: 'paramkey' });
        params.push(`\n`);
        params.push({ text: formatParam(key, response.data.model.profile.params[key]).toUpperCase(), style: 'paramvalue' });
        params.push(`\n\n`);
      }
    });
  }

  docDefinition.content[0]['table']['body'].push([
    {
      text: [`\n\n\n\n`, { text: response.data.model.name.split(' ').join(`\n`), style: 'name' }, `\n\n\n\n`, { text: 'PORTFOLIO', style: 'portfolio' }, `\n\n\n\n`, ...params],
      fillColor: '#dedede',
    },
    {
      image: `${process.cwd()}/public${response.data.model.img}`,
      width: 380,
      height: 500,
    },
  ]);
  addFooter();
  response.data.model.profile.book.map((image, index) => {
    const res = index % 2;
    if (!res) {
      if (response.data.model.profile.book[index + 1]) {
        docDefinition.content[0]['table']['body'].push([
          {
            image: `${process.cwd()}/public${response.data.model.profile.book[index].preview}`,
            width: 380,
            height: 500,
          },
          {
            image: `${process.cwd()}/public${response.data.model.profile.book[index + 1].preview}`,
            width: 380,
            height: 500,
          },
        ]);
      } else {
        docDefinition.content[0]['table']['body'].push([
          {
            image: `${process.cwd()}/public${response.data.model.profile.book[index].preview}`,
            width: 380,
            height: 450,
            fit: [380, 450],
            colSpan: 2,
            alignment: 'center',
          },
        ]);
      }
      addFooter();
    }
  });

  const filename = response.data.model.name.toLowerCase().replace(/ /g, '_');

  const printer = new pdfMake(fonts);
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);
  pdfDoc.pipe(res);
  pdfDoc.end();
}
