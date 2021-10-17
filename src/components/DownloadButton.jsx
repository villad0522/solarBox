import React from "react";
import ExcelJS from "exceljs";
import Fab from '@mui/material/Fab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const DownloadButton = ({ name = "ダウンロード", format = "xlsx", datas }) => {
    const handlerClickDownloadButton = async (e) => {
        e.preventDefault();

        const workbook = new ExcelJS.Workbook();
        workbook.addWorksheet("sheet1");
        const worksheet = workbook.getWorksheet("sheet1");

        worksheet.columns = [];

        for (const key1 in datas[0]) {
            if (Object.isObject(datas[0][key1])) {
                for (const key2 in datas[0][key1]) {
                    worksheet.columns.push({
                        header: key1 + '.' + key2,
                        key: key1 + '.' + key2,
                    });
                }
            }
            else {
                worksheet.columns.push({
                    header: key1,
                    key: key1,
                });
            }
        }

        worksheet.addRows(datas.map(data => {
            const row = {};
            for (const key1 in data) {
                if (Object.isObject(data[key1])) {
                    for (const key2 in data[key1]) {
                        row[key1 + '.' + key2] = data[key1][key2];
                    }
                }
                else {
                    row[key1] = data[key1];
                }
            }
            return row;
        }));

        let uint8Array;
        if (format === "xlsx") {
            uint8Array = await workbook.xlsx.writeBuffer(); //xlsxの場合
        }
        else {
            uint8Array = await workbook.csv.writeBuffer(); //csvの場合
        }
        const blob = new Blob([uint8Array], { type: "application/octet-binary" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sampleData." + format; //フォーマットによってファイル拡張子を変えている
        a.click();
        a.remove();
    };
    return (
        <Fab
            variant="extended"
            onClick={handlerClickDownloadButton}
            sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}
            disabled={!Array.isArray(datas) || datas?.length == 0}
        >
            <FileDownloadIcon sx={{ mr: 1 }} />
            {name}
        </Fab>
    );
};

export default DownloadButton;