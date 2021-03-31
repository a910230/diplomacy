"use strict";

var graph = {
    "boh": ["sil", "mun", "tyr", "vie", "gal"],
    "bud": ["gal", "vie", "tri", "ser", "rum"],
    "gal": ["war", "sil", "boh", "vie", "bud", "rum", "ukr"],
    "tri": ["vie", "tyr", "ven", "adr", "alb", "ser", "bud"],
    "tyr": ["mun", "pie", "ven", "tri", "vie", "boh"],
    "vie": ["boh", "tyr", "tri", "bud", "gal"],
    "cly": ["nat", "lvp", "edi", "nrg"],
    "edi": ["nrg", "cly", "lvp", "yor", "nth"],
    "lvp": ["cly", "nat", "iri", "wal", "yor", "edi"],
    "lon": ["yor", "wal", "eng", "nth"],
    "wal": ["lvp", "iri", "eng", "lon", "yor"],
    "yor": ["edi", "lvp", "wal", "lon", "nth"],
    "bre": ["eng", "mid", "gas", "par", "pic"],
    "bur": ["bel", "pic", "par", "gas", "mar", "mun", "ruh"],
    "gas": ["bre", "mid", "spa", "mar", "bur", "par"],
    "mar": ["bur", "gas", "spa", "gol", "pie"],
    "par": ["pic", "bre", "gas", "bur"],
    "pic": ["eng", "bre", "par", "bur", "bel"],
    "ber": ["bal", "kie", "mun", "sil", "pru"],
    "kie": ["den", "hel", "hol", "ruh", "mun", "ber", "bal"],
    "mun": ["kie", "ruh", "bur", "tyr", "boh", "sil", "ber"],
    "pru": ["bal", "ber", "sil", "war", "lvn"],
    "ruh": ["kie", "hol", "bel", "bur", "mun"],
    "sil": ["pru", "ber", "mun", "boh", "gal", "war"],
    "apu": ["adr", "ven", "rom", "nap", "ion"],
    "nap": ["apu", "rom", "tyn", "ion"],
    "pie": ["mar", "gol", "tus", "ven", "tyr"],
    "rom": ["ven", "tus", "tyn", "nap", "apu"],
    "tus": ["ven", "pie", "gol", "tyn", "rom"],
    "ven": ["tyr", "pie", "tus", "rom", "apu", "adr", "tri"],
    "fin": ["nwy", "swe", "bot", "stp"],
    "lvn": ["stp", "bot", "bal", "pru", "war", "mos"],
    "mos": ["stp", "lvn", "war", "ukr", "sev"],
    "sev": ["mos", "ukr", "rum", "bla", "arm"],
    "stp": ["bar", "nwy", "fin", "bot", "lvn", "mos"],
    "ukr": ["mos", "war", "gal", "rum", "sev"],
    "war": ["pru", "sil", "gal", "ukr", "mos", "lvn"],
    "ank": ["bla", "con", "smy", "arm"],
    "arm": ["sev", "bla", "ank", "smy", "syr"],
    "con": ["bla", "bul", "aeg", "smy", "ank"],
    "smy": ["ank", "con", "aeg", "eas", "syr", "arm"],
    "syr": ["arm", "smy", "eas"],
    "alb": ["ser", "tri", "adr", "ion", "gre"],
    "bel": ["nth", "eng", "pic", "bur", "ruh", "hol"],
    "bul": ["rum", "ser", "gre", "aeg", "con", "bla"],
    "den": ["ska", "nth", "hel", "kie", "bal", "swe"],
    "gre": ["ser", "alb", "ion", "aeg", "bul"],
    "hol": ["hel", "nth", "bel", "ruh", "kie"],
    "nwy": ["nrg", "nth", "ska", "swe", "fin", "stp", "bar"],
    "naf": ["wes", "mid", "tun"],
    "por": ["spa", "mid"],
    "rum": ["ukr", "gal", "bud", "ser", "bul", "bla", "sev"],
    "ser": ["bud", "tri", "alb", "gre", "bul", "rum"],
    "spa": ["mid", "por", "wes", "gol", "mar", "gas"],
    "swe": ["nwy", "ska", "den", "bal", "bot", "fin"],
    "tun": ["tyn", "wes", "naf", "ion"],
    "adr": ["tri", "ven", "apu", "ion", "alb"],
    "aeg": ["bul", "gre", "ion", "eas", "smy", "con"],
    "bal": ["bot", "swe", "den", "kie", "ber", "pru", "lvn"],
    "bar": ["nrg", "nwy", "stp"],
    "bla": ["sev", "rum", "bul", "con", "ank", "arm"],
    "eas": ["smy", "aeg", "ion", "syr"],
    "eng": ["wal", "iri", "mid", "bre", "pic", "bel", "nth", "lon"],
    "bot": ["fin", "swe", "bal", "lvn", "stp"],
    "gol": ["mar", "spa", "wes", "tyn", "tus", "pie"],
    "hel": ["nth", "hol", "kie", "den"],
    "ion": ["adr", "apu", "nap", "tyn", "tun", "eas", "aeg", "gre", "alb"],
    "iri": ["nat", "mid", "eng", "wal", "lvp"],
    "mid": ["eng", "iri", "nat", "naf", "wes", "spa", "por", "gas", "bre"],
    "nat": ["mid", "iri", "lvp", "cly", "nrg"],
    "nth": ["nrg", "edi", "yor", "lon", "eng", "bel", "hol", "hel", "den", "ska", "nwy"],
    "nrg": ["nat", "cly", "edi", "nth", "nwy", "bar"],
    "ska": ["nwy", "nth", "den", "swe"],
    "tyn": ["gol", "wes", "tun", "ion", "nap", "rom", "tus"],
    "wes": ["gol", "spa", "mid", "naf", "tun", "tyn"]
};

function getProv(id) {
    return document.getElementById("map").getSVGDocument().getElementById(id);
}

function getProvType(prov) {
    var obj = getProv(prov);
    if (obj.classList[0] == "sea") return "sea";
    if (obj.getElementsByTagName("use").length == 1) return "inland";
    return "coast";
}
function getProvName(prov) {
    return getProv(prov).getElementsByTagName("text")[0].textContent;
}
function getUnitType(unit) {
    var possibleUnits = getProv(unit).getElementsByTagName("use");
    for (let i = 0; i < possibleUnits.length; ++i) {
        if (!possibleUnits[i].classList.contains("emp")) return possibleUnits[i].classList[0];
    }
    return "";
}
function getUnitLoc(unit) { // Must have two coasts
    var possibleUnits = getProv(unit).getElementsByTagName("use");
    for (let i = 0; i < possibleUnits.length; ++i) {
        if (!possibleUnits[i].classList.contains("emp")) return possibleUnits[i].classList[1];
    }
}
function getUnitName(unit) {
    var type = getUnitType(unit);
    if (type == "") return "";
    var ret = (type == "army")? "A ": "F ";
    ret += getProvName(unit);
    return ret;
}
function appendOrder(newOrder) {
    var orders = document.getElementById("orders");
    var oldOrders = orders.childNodes;
    for (var i = 0; i < oldOrders.length; ++i) {
        if (oldOrders[i].getAttribute("unit") == newOrder.getAttribute("unit")) {
            oldOrders[i].remove();
            break;
        }
    }
    newOrder.className = "order";
    newOrder.removeAttribute("id");
    orders.appendChild(newOrder);
}
function twoCoasts(from, to) {
    switch (to) {
        case "spa":
            if (from == "mid" || from == "por") return true;
            break;
        case "bul":
            if (from == "con") return true;
            break;
    }
    return false;
}
function legalMove(from, to, byConvoy) {
    if (from == to) return false;
    var unitType = getUnitType(from);
    var fromType = getProvType(from);
    var toType = getProvType(to);
    if ((unitType == "army" && toType == "sea") || (unitType == "fleet" && toType == "inland")) return false;
    if (!graph[from].includes(to)) {
        if (byConvoy && unitType == "army" && fromType == "coast" && toType == "coast") return true;
        return false;
    }
    if (unitType == "army") return true;
    var separate = {
        "edi": ["lvp"],
        "lvp": ["edi", "yor"],
        "wal": ["yor"],
        "yor": ["lvp", "wal"],
        "gas": ["mar"],
        "mar": ["gas"],
        "apu": ["rom"],
        "pie": ["ven"],
        "rom": ["apu", "ven"],
        "tus": ["ven"],
        "ven": ["pie", "rom", "tus"],
        "fin": ["nwy"],
        "ank": ["smy"],
        "arm": ["smy", "syr"],
        "smy": ["ank", "arm"],
        "syr": ["arm"],
        "nwy": ["fin"]
    };
    if (separate.hasOwnProperty(from)) {
        if (separate[from].includes(to)) return false;
    }
    switch (from) {
        case "bul": {
            let loc = getUnitLoc(from);
            if (loc == "north") {
                if (to == "gre" || to == "aeg") return false;
            }
            else {
                if (to == "rum" || to == "bla") return false;
            }
            break;
        }
        case "spa": {
            let loc = getUnitLoc(from);
            if (loc == "north") {
                if (to == "wes" || to == "gol" || to == "mar") return false;
            }
            else {
                if (to == "gas") return false;
            }
            break;
        }
        case "stp": {
            let loc = getUnitLoc(from);
            if (loc == "north") {
                if (to == "fin" || to == "bot" || to == "lvn") return false;
            }
            else {
                if (to == "bar" || to == "nwy") return false;
            }
            break;
        }
    }
    return true;
}

function order(obj, event) {
    var role = document.getElementById("map").getAttribute("role"); //玩家國家
    var unit = obj.getElementsByClassName(role);
    if (unit.length == 0) return; //判斷是否有玩家單位
    document.getElementById("map").setAttribute("unit", obj.id);
    var menu = document.getElementById("menu");
    var title = menu.firstElementChild.firstElementChild;
    var options = menu.lastElementChild;
    title.innerHTML = getUnitName(obj.id);
    options.innerHTML = "<span onclick=\"javascript:hold()\">Hold</span> <span onclick=\"javascript:move()\">Move</span> <span onclick=\"javascript:support()\">Support</span>";
    if (getUnitType(obj.id) == "fleet") {
        if (getProvType(obj.id) == "sea") options.innerHTML += " <span onclick=\"javascript:convoy()\">Convoy</span>";
    }
    menu.style.left = (event.pageX + 10) + "px";
    menu.style.top = (event.pageY + 10) + "px";
    menu.style.visibility = "visible";
}
function hold() {
    var unit = document.getElementById("map").getAttribute("unit");
    document.getElementById("menu").style.visibility = "hidden";
    var newOrder = document.createElement("span");
    newOrder.setAttribute("unit", unit);
    newOrder.innerHTML = getUnitName(unit) + " H<br/>";
    appendOrder(newOrder);
    document.getElementById("map").removeAttribute("unit");
}
function move() {
    var unit = document.getElementById("map").getAttribute("unit");
    document.getElementById("menu").style.visibility = "hidden";
    var orders = document.getElementById("orders");
    var tmpOrder = document.createElement("span");
    tmpOrder.id = "tmpOrder";
    tmpOrder.setAttribute("unit", unit);
    tmpOrder.innerHTML = getUnitName(unit) + " - ";
    orders.appendChild(tmpOrder);
    document.getElementById("map").setAttribute("status", "move");
}
function moveTo(obj, event) {
    var unit = document.getElementById("map").getAttribute("unit");
    var unitType = getUnitType(unit);
    var provType = getProvType(obj.id);
    if (!legalMove(unit, obj.id, true)) return;
    if (unitType == "fleet" && twoCoasts(unit, obj.id)) return coastOrder(unit, obj.id, event);
    document.getElementById("menu").style.visibility = "hidden";
    var tmpOrder = document.getElementById("tmpOrder");
    tmpOrder.innerHTML += getProvName(obj.id) + "<br/>";
    appendOrder(tmpOrder);
    document.getElementById("map").setAttribute("status", "wait");
    document.getElementById("map").removeAttribute("unit");
}
function coastOrder(from, to, event) {
    var menu = document.getElementById("menu");
    var title = menu.firstElementChild.firstElementChild;
    var options = menu.lastElementChild;
    title.innerHTML = getUnitName(from) + " - " + getProvName(to);
    options.innerHTML = "<span onclick=\"javascript:coast(0)\">North Coast</span> / <span onclick=\"javascript:coast(1)\">South Coast</span>";
    menu.style.left = (event.pageX + 10) + "px";
    menu.style.top = (event.pageY + 10) + "px";
    menu.style.visibility = "visible";
}
function coast(coast) { // 0 = North, 1 = South
    var menu = document.getElementById("menu");
    menu.style.visibility = "hidden";
    var title = menu.firstElementChild.firstElementChild;
    var tmpOrder = document.getElementById("tmpOrder");
    tmpOrder.innerHTML = title.innerHTML;
    if (coast) tmpOrder.innerHTML += " (sc)<br/>";
    else tmpOrder.innerHTML += " (nc)<br/>";
    appendOrder(tmpOrder);
    document.getElementById("map").setAttribute("status", "wait");
    document.getElementById("map").removeAttribute("unit");
}
function support() {
    var unit = document.getElementById("map").getAttribute("unit");
    document.getElementById("menu").style.visibility = "hidden";
    var orders = document.getElementById("orders");
    var tmpOrder = document.createElement("span");
    tmpOrder.id = "tmpOrder";
    tmpOrder.setAttribute("unit", unit);
    tmpOrder.innerHTML = getUnitName(unit) + " S ";
    orders.appendChild(tmpOrder);
    document.getElementById("map").setAttribute("status", "sup");
}
function supOrder(obj, event) {
    if (obj.id == document.getElementById("map").getAttribute("unit")) return;
    var name = getUnitName(obj.id);
    if (name == "") return;
    var menu = document.getElementById("menu");
    var title = menu.firstElementChild.firstElementChild;
    var options = menu.lastElementChild;
    var supporter = document.getElementById("map").getAttribute("unit");
    title.innerHTML = getUnitName(supporter) + " S " + name;
// May cause stuck
    options.innerHTML = ""; 
    if (legalMove(supporter, obj.id, false)) options.innerHTML += "<span onclick=\"javascript:supHold()\">Hold</span>";
    var supGoal = graph[supporter];
    for (let i = 0; i < supGoal.length; ++i) {
        if (legalMove(obj.id, supGoal[i], true) && legalMove(supporter, supGoal[i], false)) {
            options.innerHTML += " <span onclick=\"javascript:supMove()\">Move</span>";
            break;
        }
    }
    if (options.innerHTML == "") {
        menu.style.visibility = "hidden";
        return;
    }
// May cause stuck
    //options.innerHTML = "<span onclick=\"javascript:supHold()\">Hold</span> <span onclick=\"javascript:supMove()\">Move</span>";
    menu.style.left = (event.pageX + 10) + "px";
    menu.style.top = (event.pageY + 10) + "px";
    menu.style.visibility = "visible";
    var tmpOrder = document.getElementById("tmpOrder");
    tmpOrder.innerHTML = title.innerHTML;
    document.getElementById("map").setAttribute("unit2", obj.id);
}
function supHold(obj) {
    document.getElementById("menu").style.visibility = "hidden";
    var tmpOrder = document.getElementById("tmpOrder");
    tmpOrder.innerHTML += " H<br/>";
    appendOrder(tmpOrder);
    document.getElementById("map").setAttribute("status", "wait");
    document.getElementById("map").removeAttribute("unit");
    document.getElementById("map").removeAttribute("unit2");
}
function supMove() {
    document.getElementById("map").setAttribute("status", "supMove");
    document.getElementById("menu").style.visibility = "hidden";
}
function supMoveTo(obj) {
    var tmpOrder = document.getElementById("tmpOrder");
    var supporter = tmpOrder.getAttribute("unit");
    var receiver = document.getElementById("map").getAttribute("unit2");
    if (!legalMove(receiver, obj.id, true) || !legalMove(supporter, obj.id, false)) return;
    tmpOrder.innerHTML += " - " + getProvName(obj.id) + "<br/>";
    appendOrder(tmpOrder);
    document.getElementById("map").setAttribute("status", "wait");
    document.getElementById("map").removeAttribute("unit");
}
function convoy() {
    var unit = document.getElementById("map").getAttribute("unit");
    document.getElementById("menu").style.visibility = "hidden";
    var orders = document.getElementById("orders");
    var tmpOrder = document.createElement("span");
    tmpOrder.id = "tmpOrder";
    tmpOrder.setAttribute("unit", unit);
    tmpOrder.innerHTML = getUnitName(unit) + " C ";
    orders.appendChild(tmpOrder);
    document.getElementById("map").setAttribute("status", "con");
}
function conOrder(obj) {
    if (getUnitType(obj.id) != "army") return;
    if (getProvType(obj.id) != "coast") return;
    var tmpOrder = document.getElementById("tmpOrder");
    tmpOrder.innerHTML += getUnitName(obj.id) + " - ";
    document.getElementById("map").setAttribute("status", "conMove");
    document.getElementById("map").setAttribute("unit2", obj.id);
}
function conMoveTo(obj) {
    if (getProvType(obj.id) != "coast") return;
    if (!legalMove(document.getElementById("map").getAttribute("unit2"), obj.id, true)) return;
    var tmpOrder = document.getElementById("tmpOrder");
    tmpOrder.innerHTML += getProvName(obj.id) + "<br/>";
    appendOrder(tmpOrder);
    document.getElementById("map").setAttribute("status", "wait");
    document.getElementById("map").removeAttribute("unit");
    document.getElementById("map").removeAttribute("unit2");
}

function clicked(obj, event) {
    var map = document.getElementById("map");
    var status = map.getAttribute("status");
    switch (status) {
        case "wait":
            order(obj, event);
            break;
        case "move":
            moveTo(obj, event);
            break;
        case "sup":
            supOrder(obj, event);
            break;
        case "supMove":
            supMoveTo(obj);
            break;
        case "con":
            conOrder(obj);
            break;
        case "conMove":
            conMoveTo(obj);
            break;
    }
}
function sendOrders() {
    var orders = document.getElementById("orders").getElementsByClassName("order");
    var ansatz1 = /[AF]\s+(\w{3})\s+([-HSC])\s?([^]*)/;
    var ansatz2 = /[AF]\s+(\w{3})\s+([-H])\s?(\w*)/;
    var ret = [];
    for (let i = 0; i < orders.length; ++i) {
        let order = orders[i].textContent;
        let parsed1 = ansatz1.exec(order);
        ret[i] = [parsed1[1].toLowerCase()];
        let method = parsed1[2];
        switch (method) {
            case "-": {
                ret[i].push(parsed1[3].toLowerCase());
                break;
            }
            case "H": {
                ret[i].push(method);
                break;
            }
            case "S": {
                ret[i].push(method);
                let supOrder = ansatz2.exec(parsed1[3]);
                ret[i].push(supOrder[1].toLowerCase());
                let supMethod = supOrder[2];
                if (supMethod == "-") ret[i].push(supOrder[3].toLowerCase());
                else ret[i].push(supMethod);
                break;
            }
            case "C": {
                ret[i].push(method);
                let conOrder = ansatz2.exec(parsed1[3]);
                ret[i].push(conOrder[1].toLowerCase());
                ret[i].push(conOrder[3].toLowerCase());
                break;
            }
        }
    }
    var xmlhttp;
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function() {
        document.getElementById("result").innerHTML = "傳送中";
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("result").innerHTML = "傳送成功";
            document.getElementById("result").innerHTML += xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", "https://diplomacy.guru/", true);
    xmlhttp.setRequestHeader("Content-type", "application/json;charset=utf-8");
    xmlhttp.send(JSON.stringify(ret));
}