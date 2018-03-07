var fs = require('fs');
var xlsx = require('xlsx');
var datatype = require('./datatype.js');
var buildSheet = function (name, data) {
    var types = data[0];
    var result = [];
    for (var i = 2; i < data.length; i++) {
        var rowData = {};
        for (var field in types) {
            var toType = datatype[types[field]];
            var v = data[i][field];
            if (toType) {
                v = toType(v);
            }
            rowData[field] = v;
        }
        result.push(rowData);
    }
    return result;
}

var buildStruct = function (name, data) {
    var result = {};
    var types = data[0];
    for(var field in types){
        if(field) result[field] = types[field]; 
    }
    return result;
}

function parse(filename) {
    var data = xlsx.readFile(filename);
    var sheets = data.Sheets;
    var result = {};
    for (var i in sheets) {
        var match = i.match(/\((.*)\)/);
        if (match) {
            sheetName = match[1];
            var rawData = xlsx.utils.sheet_to_json(sheets[i], { raw: true });
            result[sheetName] = {
                data:buildSheet(sheetName, rawData),
                fields:buildStruct(sheetName, rawData)
            };
        }
    }
    return result;
};


function toCSharp(filename) {
    var filename = sheetName;
    var excelData = parse(filename);
    var fields = excelData.fields;
    var data = excelData.data;
    var buf = `
using System;
using UnityEngine;
using System.Collections.Generic;
namespace Dict
{
    class ${sheetName}
    {
        public class Record
        {
${defFields.join('\n')}
        }
        static public Dictionary<string, Record> data = new Dictionary<string,Record>();
        static public bool isPreload = false;
        static public void Preload()
        {
            if (isPreload) return;
            TextAsset sr = null;
            try
            {
                sr = Resources.Load("Data/${filename}") as TextAsset;
            }
            catch
            {
                Debug.Log("Can not find ${filename} ");
            }
            var jsonObj = new JSONObject(sr.ToString());
            var list = jsonObj.list;
            foreach(var row in list){
                var record = new Record();
                record.id = row["id"].str;
${setFields.join('\n')}
                data[record.id] = record;
            }
            isPreload = true;
        }
        static public Record getRecord(string id)
        {
            if (data.ContainsKey(id))
            {
                return data[id];
            }
            else
            {
                return null;
            }
        }
    }
}
    `;
    return buf;
}

(function(){
    var data = parse("");
})();