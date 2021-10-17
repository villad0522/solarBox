import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DialogContentText from '@mui/material/DialogContentText';

import actions from '../../../actions';

//全角を半角に変換する関数
const hankaku2Zenkaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

const ChangeSleepTime = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [emptyFlag, setEmptyFlag] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sleepTime, setSleepTime] = useState("0000");
  const [text, setText] = useState("");

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "sleepTime",
      ["SSTM " + sleepTime + "\r", "RSTM\r"],
    ));
  };

  const handleChange = (event) => {
    setText(event.target.value);
    const text = hankaku2Zenkaku(event.target.value);
    const number = parseInt(text);
    let errorFlag = false;
    let fractionFlag = false;
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === ".") {
        fractionFlag = true;
      }
      const n = parseInt(text.charAt(i));
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
    else if (number > 65535) {
      setErrorFlag(true);
      setErrorMessage("最大65535秒です");
    }
    else if (fractionFlag) {
      setErrorFlag(true);
      setErrorMessage("小数は設定できません");
    }
    else if (errorFlag) {
      setErrorFlag(true);
      setErrorMessage("0～65535の整数を10進数で入力してください");
    }
    else {
      setEmptyFlag(false);
      setErrorFlag(false);
      setErrorMessage("");
      const sleepTime = ('0000' + number.toString(16).toUpperCase()).substr(-4);
      setSleepTime(sleepTime);
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
        <DialogTitle>スリープ時間変更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            0 秒に設定すると連続スリープとなります。
          </DialogContentText>
          <TextField
            value={text}
            onChange={handleChange}
            error={errorFlag}
            helperText={errorMessage}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">秒</InputAdornment>,
            }}
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
export default ChangeSleepTime;
