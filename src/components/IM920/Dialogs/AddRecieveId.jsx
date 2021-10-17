import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import actions from '../../../actions';

//全角を半角に変換する関数
const hankaku2Zenkaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

const AddRecieveId = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [emptyFlag, setEmptyFlag] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState("0000");
  const [text, setText] = useState("");

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "recieveIds",
      ["ENWR\r", "SRID " + id + "\r", "DSWR\r", "RRID\r"],
    ));
  };

  const handleChange = (event) => {
    let newText = hankaku2Zenkaku(event.target.value);
    let head = newText.slice(0, 2);
    if (head === "0x" || head === "0X") {
      newText = newText.slice(2); //先頭から２文字を削除
    }
    else {
      head = "";
    }
    if (newText.length > 4) {
      setErrorMessage("最大４桁です");
      return;
    }
    setText(event.target.value);
    const number = parseInt(newText, 16);
    let errorFlag = false;
    for (let i = 0; i < newText.length; i++) {
      const n = parseInt(newText.charAt(i), 16);
      if (Number.isNaN(n)) {
        errorFlag = true;
      }
    }
    if (newText.length === 0) {
      setEmptyFlag(true);
      setErrorMessage("");
    }
    else if (number < 0) {
      setErrorFlag(true);
      setErrorMessage("マイナス値は設定できません");
    }
    else if (errorFlag) {
      setErrorFlag(true);
      setErrorMessage("16進数4桁で記入してください");
    }
    else {
      setEmptyFlag(false);
      setErrorFlag(false);
      setErrorMessage("");
      const id = ('0000' + number.toString(16).toUpperCase()).substr(-4);
      setId(id);
    }
  };

  return (
    <div>
      <Button variant="contained" size="small" color="primary" onClick={() => setOpen(true)}>
        追加
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>受信ID 追加登録</DialogTitle>
        <DialogContent>
          <TextField
            value={text}
            onChange={handleChange}
            error={errorFlag}
            helperText={errorMessage}
            label="追加する ID"
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
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddRecieveId;
