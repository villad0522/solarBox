import React from "react";
import ExcelJS from "exceljs";
import Fab from '@mui/material/Fab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const downloadFunc = async () => {
    try {
        const res = await axios.get("https://tec-log2.azurewebsites.net/api/getSolarAll?code=oNgnwUM00BM2KCAt2LDb/yccjS9GNs87MXFuk5aRrIPvSPRZpQ3ViQ==");
        console.log(res);
        if (res.status === 200) {
            return res.data;
        }
    }
    catch (error) {
        console.log("エラー");
        console.log(error);
    }
    return null;
};

const DownloadButton = ({
    name = "ダウンロード",
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlerClickDownloadButton = async (e, format) => {
        e.preventDefault();
        setAnchorEl(null);

        const datas = await downloadFunc();

        if (!datas) {
            alert("ダウンロード失敗");
            return;
        }
        if ((!Array.isArray(datas)) || (datas?.length === 0)) {
            alert("データがありません");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        workbook.addWorksheet("sheet1");
        const worksheet = workbook.getWorksheet("sheet1");

        worksheet.columns = [];
        const columns = [];
        for (const key1 in datas[0]) {
            if (datas[0][key1] instanceof Object) {
                for (const key2 in datas[0][key1]) {
                    columns.push({
                        header: key1 + '_' + key2,
                        key: key1 + '_' + key2,
                    });
                }
            }
            else {
                columns.push({
                    header: key1,
                    key: key1,
                });
            }
        }
        worksheet.columns = columns;

        await worksheet.addRows(datas.map(data => {
            const row = {};
            for (const key1 in data) {
                if (data[key1] instanceof Object) {
                    for (const key2 in data[key1]) {
                        row[key1 + '_' + key2] = data[key1][key2];
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
        <>
            <Fab
                variant="extended"
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
            >
                <FileDownloadIcon sx={{ mr: 1 }} />
                {name}
            </Fab>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem
                    onClick={(e) => handlerClickDownloadButton(e, "csv")}
                >
                    CSV
                </MenuItem>
                <MenuItem
                    onClick={(e) => handlerClickDownloadButton(e, "xlsx")}
                >
                    Excel
                </MenuItem>
            </Menu>
        </>
    );
};

export default DownloadButton;