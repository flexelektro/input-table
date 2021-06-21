---
layout: layout.njk
title: My Rad Blog
---

  <h1 style='margin-bottom: 0em; font-size: 70px'>input-table</h1>
  <h3 style="margin:0"> the component for winners</h3>

## Pure

```
    <input-table onInput='logit(this,event)'></input-table>
```

<input-table></input-table>


## Only Data

```
<input-table data='[["Felix","Deimling","42"]]' name='meinfeld2'></input-table>
```

<input-table data='[["Felix","Deimling","42"]]' name='meinfeld2'></input-table>

## Only Headers
```
<input-table header='["Vorname","Nachname","Alter","Vermögen"]' name='meinfeld3'></input-table>
```

<input-table header='["Vorname","Nachname","Alter","Vermögen"]' name='meinfeld3'></input-table>

## With Headers
```
<input-table header='["Vorname","Nachname","Alter","Vermögen"]' data='[["Felix","Deimling","42"]]' name='meinfeld3'></input-table>

```


## With fixedheader
```
<input-table fixedheader header='["Montag","Dienstag","Mittwoch","Donnerstag","Freitag"]' data='[[""]]' name='meinfeld4'></input-table>
sdd
```



