import React from "react";
import ExcelJS from "exceljs";

const DownloadButton = ({ name = "ダウンロード", format = "xlsx" }) => {
    const handlerClickDownloadButton = async (e) => {
        e.preventDefault();

        const workbook = new ExcelJS.Workbook();
        workbook.addWorksheet("sheet1");
        const worksheet = workbook.getWorksheet("sheet1");

        worksheet.columns = [
            { header: "ID", key: "id" },
            { header: "作成日時", key: "createdAt" },
            { header: "名前", key: "name" }
        ];

        worksheet.addRows([
            {
                id: "f001",
                createdAt: 1629902208,
                name: "りんご"
            },
            {
                id: "f002",
                createdAt: 1629902245,
                name: "ぶとう"
            },
            {
                id: "f003",
                createdAt: 1629902265,
                name: "ばなな"
            }
        ]);

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
        <button onClick={handlerClickDownloadButton}>
            {name}
        </button>
    );
};

export default DownloadButton;