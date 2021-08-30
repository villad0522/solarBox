import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContentText from '@material-ui/core/DialogContentText';

import actions from '../../../actions';

//全角を半角に変換する関数
const hankaku2Zenkaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

//小数点以下の桁数を取得する関数
const getDecimalPointLength = (numberString) => {
  const numbers = numberString.split('.');
  return (numbers[1]) ? numbers[1].length : 0;
};

const ChangeWorkTime = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [emptyFlag, setEmptyFlag] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [workTime, setWorkTime] = useState("0000");
  const [text, setText] = useState("");

  const handleAgree = () => {
    setOpen(false);
    dispatch(actions.im920.wired.executeCommands(
      "workTime",
      ["SWTM " + workTime + "\r", "RWTM\r"],
    ));
  };

  const handleChange = (event) => {
    setText(event.target.value);
    const text = hankaku2Zenkaku(event.target.value);
    const number = parseFloat(text);
    let errorFlag = false;
    for (let i = 0; i < text.length; i++) {
      const n = parseInt(text.charAt(i));
      if (text.charAt(i) !== "." && Number.isNaN(n)) {
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
    else if (number > 656) {
      setErrorFlag(true);
      setErrorMessage("最大656秒です");
    }
    else if (errorFlag) {
      setErrorFlag(true);
      setErrorMessage("0～656の小数を10進数で入力してください");
    }
    else {
      if (getDecimalPointLength(text) > 2) {
        setErrorMessage("小数点以下２桁までしか反映されません");
      }
      else {
        setErrorMessage("");
      }
      setEmptyFlag(false);
      setErrorFlag(false);
      const number2 = Math.round(number / 0.01001);
      const workTime = ('0000' + number2.toString(16).toUpperCase()).substr(-4);
      setWorkTime(workTime);
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
        <DialogTitle>間欠動作時間変更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            10.01 ミリ秒単位で反映されます
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
export default ChangeWorkTime;
