import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';

import actions from '../../../actions';

//全角を半角に変換する関数
const hankaku2Zenkaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

const ChangeNodeNumber = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [emptyFlag, setEmptyFlag] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [nodeNumber, setNodeNumber] = useState("00");
  const [text, setText] = useState("");

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "nodeNumber",
      ["STNN " + nodeNumber + "\r", "RDNN\r"],
    ));
  };

  const handleChange = (event) => {
    let text = hankaku2Zenkaku(event.target.value);
    let head = text.slice(0, 2);
    if (head === "0x" || head === "0X") {
      text = text.slice(2); //先頭から２文字を削除
    }
    else {
      head = "";
    }
    if (text.length > 2) {
      setErrorMessage("最大２桁です");
      return;
    }
    setText(event.target.value);
    const number = parseInt(text, 16);
    let errorFlag = false;
    for (let i = 0; i < text.length; i++) {
      const n = parseInt(text.charAt(i), 16);
      if (Number.isNaN(n)) {
        errorFlag = true;
      }
    }
    if (text.length === 0) {
      setEmptyFlag(true);
      setErrorFlag(false);
      setErrorMessage("");
    }
    else if (number < 0) {
      setErrorFlag(true);
      setErrorMessage("マイナス値は設定できません");
    }
    else if (errorFlag) {
      setErrorFlag(true);
      setErrorMessage("16進数2桁で記入してください");
    }
    else {
      setEmptyFlag(false);
      setErrorFlag(false);
      setErrorMessage("");
      const nodeNumber = ('00' + number.toString(16).toUpperCase()).substr(-2);
      setNodeNumber(nodeNumber);
    }
  };

  return (
    <div>
      <Button variant="contained" size="small" color="primary" onClick={() => setOpen(true)}>
        変更
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>ノード番号変更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ノード番号は送信モジュール ID とは別に任意に設定できる 8bit の番号です。<br />
            ユニークな値でなくてもかまいません。
          </DialogContentText>
          <TextField
            value={text}
            onChange={handleChange}
            error={errorFlag}
            helperText={errorMessage}
            label="ノード番号"
            variant="outlined"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            キャンセル
          </Button>
          <Button
            disabled={errorFlag || emptyFlag}
            onClick={handleAgree}
            variant="contained"
            color="primary"
          >
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ChangeNodeNumber;
