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

function getProv(provID) { // province object
    return document.getElementById("map").getSVGDocument().getElementById(provID);
}
function getProvType(provID) { // "sea", "inland", or "coast"
    var obj = getProv(provID);
    if (obj.classList[0] == "sea") return "sea";
    if (obj.getElementsByTagName("use").length == 1) return "inland";
    return "coast";
}
function getProvName(provID) { // "StP", "NAf", ...
    return getProv(provID).getElementsByTagName("text")[0].textContent;
}
function getUnitType(provID) { // "army", "fleet", or ""
    var possibleUnits = getProv(provID).getElementsByTagName("use");
    for (let i = 0; i < possibleUnits.length; ++i) {
        if (!possibleUnits[i].classList.contains("emp")) return possibleUnits[i].classList[0];
    }
    return "";
}
function getUnitLoc(provID) { // "north", "south", or ""
    if (getUnitType(provID) != "fleet") return "";
    var possibleUnits = getProv(provID).getElementsByTagName("use");
    if (possibleUnits.length != 3) return "";
    for (let i = 0; i < 3; ++i) {
        if (!possibleUnits[i].classList.contains("emp")) return possibleUnits[i].classList[1];
    }
}
function getUnitName(provID) { // "A Mar", "F Bla", ... , or ""
    var type = getUnitType(provID);
    if (type == "") return "";
    var ret = (type == "army")? "A ": "F ";
    ret += getProvName(provID);
    return ret;
}
function getRole() { // role of player
    return document.getElementById("info").getAttribute("role");
}
function getTmpOrder() { // tmpOrder object
    return document.getElementById("tmpOrder");
}
function getUnit() { // unit in new order ("stpn" for example)
    return getTmpOrder().getAttribute("unit");
}
function getOrderText() { // literal for tmpOrder
    var order = getTmpOrder();
    var text = "";

    var unit = getUnit();
    if (unit == "") return text;
    if (unit.length == 4) unit = unit.slice(0, 3);
    text += getUnitName(unit);

    var obj1 = order.getAttribute("obj1");
    if (obj1 == "") return text;
    if (obj1 == "H") {
        text += " H";
        return text;
    }
    if (obj1 == "S" || obj1 == "C") {
        text += " " + obj1;
    } else if (obj1.length == 4) {
        text += " - " + getProvName(obj1.slice(0, 3));
        text += (obj1[3] == "n")? " (nc)": " (sc)";
        return text;
    } else {
        text += " - " + getProvName(obj1);
        return text;
    }

    var obj2 = order.getAttribute("obj2");
    if (obj2 == "") return text;
    if (obj2.length == 4) obj2 = obj2.slice(0, 3);
    text += " " + getUnitName(obj2);

    var obj3 = order.getAttribute("obj3");
    if (obj3 == "") return text;
    if (obj3 == "H") {
        text += " H";
        return text;
    }
    if (obj3.length == 4) {
        text += " - " + getProvName(obj3.slice(0, 3));
        text += (obj3[3] == "n")? " (nc)": " (sc)";
        return text;
    }
    text += " - " + getProvName(obj3);
    return text;
}
function getStatus() { // "wait", "move", "sup", 
    return document.getElementById("map").getAttribute("status");
}
function needToChooseCoast(from, to) { // true or false
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
function getDestWithCoast(provID) { // "stp", "stpn", "stps", ...
    var unit = getUnit().slice(0, 3);
    if (getUnitType(unit) != "fleet") return provID;
    switch (provID) {
        case "stp": {
            if (["bar", "nwy"].includes(unit)) return "stpn";
            if (["fin", "lvn", "bot"].includes(unit)) return "stps";
            break;
        }
        case "bul": {
            if (["rum", "bla"].includes(unit)) return "buln";
            if (["gre", "aeg"].includes(unit)) return "buls";
            break;
        }
        case "spa": {
            if (unit == "gas") return "span";
            if (["mar", "gol", "wes"].includes(unit)) return "spas";
            break;
        }
    }
    return provID;
}
function legalMove(from, to, byConvoy) { //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
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

function setStatus(status) { // set order status
    document.getElementById("map").setAttribute("status", status);
}
function clearTmpOrder(n) { // clear from n-th element
    var order = getTmpOrder();
    switch (n) {
        case 0:
            order.innerHTML = "";
            order.setAttribute("unit", "");
        case 1:
            order.setAttribute("obj1", "");
        case 2:
            order.setAttribute("obj2", "");
        case 3:
            order.setAttribute("obj3", "");
    }
}
function prepare(text, n) {
    var order = getTmpOrder();
    switch (n) {
        case 0: { // text == ordered unit
            if (getUnitLoc(text) != "") { // unit on one of two coasts
                text += getUnitLoc(text)[0];
            }
            order.setAttribute("unit", text);
            clearTmpOrder(1);
            break;
        }
        case 1: { // text == "H", "S", "C", "spa", "spas", ...
            if (text == "stp" || text == "bul" || text == "spa") text = getDestWithCoast(text);
            order.setAttribute("obj1", text);
            clearTmpOrder(2);
            break;
        }
        case 2: { // text == supported or convoyed unit
            if (getUnitLoc(text) != "") { // unit on one of two coasts
                text += getUnitLoc(text)[0];
            }
            order.setAttribute("obj2", text);
            clearTmpOrder(3);
            break;
        }
        case 3: { // text == "H", "spa", ...
            order.setAttribute("obj3", text)
            break;
        }
    }
    order.innerHTML = getOrderText();
}
function appendOrder() {
    var newOrder = document.createElement("span");
    var tmpOrder = getTmpOrder();
    newOrder.setAttribute("unit", getUnit());
    newOrder.setAttribute("obj1", tmpOrder.getAttribute("obj1"));
    newOrder.setAttribute("obj2", tmpOrder.getAttribute("obj2"));
    newOrder.setAttribute("obj3", tmpOrder.getAttribute("obj3"));
    newOrder.innerHTML = tmpOrder.innerHTML + "<br/>";
    clearTmpOrder(0);
    
    var orders = document.getElementById("orders");
    var oldOrders = orders.childNodes;
    for (var i = 0; i < oldOrders.length; ++i) {
        if (oldOrders[i].getAttribute("unit") == newOrder.getAttribute("unit")) {
            oldOrders[i].remove();
            break;
        }
    }
    newOrder.className = "order";
    orders.appendChild(newOrder);
}
function showResult(json) { // literal for tmpOrder
    var orders = JSON.parse(json);
    var result = document.getElementById("result");
    orders.forEach(order => {
        let node = document.createElement("span");
        let text = "";
        console.log(order)

        let unit = order[0];
        if (unit.length == 4) unit = unit.slice(0, 3);
        text += getUnitName(unit);

        let obj1 = order[1];
        if (obj1 == "H") {
            text += " H";
        } else if (obj1 == "S" || obj1 == "C") {
            text += " " + obj1;
        } else if (obj1.length == 4) {
            text += " - " + getProvName(obj1.slice(0, 3));
            text += (obj1[3] == "n")? " (nc)": " (sc)";
        } else {
            text += " - " + getProvName(obj1);
        }

        let obj2 = order[2];
        if (obj2 == "") {
            node.innerText = text + "<br/>";
            result.appendChild(node);
            return;
        }
        if (obj2.length == 4) obj2 = obj2.slice(0, 3);
        text += " " + getUnitName(obj2);

        let obj3 = order[3];
        if (obj3 == "H") {
            text += " H";
        }
        if (obj3.length == 4) {
            text += " - " + getProvName(obj3.slice(0, 3));
            text += (obj3[3] == "n")? " (nc)": " (sc)";
        } else {
            text += " - " + getProvName(obj3);
        }
        node.innerText = text + "<br/>";
        result.appendChild(node);
        return;
    });
}

function order(obj, event) {
    var role = getRole();
    if (obj.getElementsByClassName(role).length == 0) return; // have unit in obj
    prepare(obj.id, 0);
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
    document.getElementById("menu").style.visibility = "hidden";
    prepare("H", 1);
    appendOrder();
}
function move() {
    document.getElementById("menu").style.visibility = "hidden";
    getTmpOrder().innerHTML += " -";
    setStatus("move");    
}
function moveTo(obj, event) {
    var unit = getUnit().slice(0, 3);
    var unitType = getUnitType(unit);
    if (!legalMove(unit, obj.id, true)) return;
    if (unitType == "fleet" && needToChooseCoast(unit, obj.id)) return coastOrder(obj.id, event);
    document.getElementById("menu").style.visibility = "hidden";
    prepare(obj.id, 1);
    appendOrder();
    setStatus("wait");
}
function coastOrder(provID, event) {
    prepare(provID, 1);
    getTmpOrder().innerHTML += " (";
    var menu = document.getElementById("menu");
    var title = menu.firstElementChild.firstElementChild;
    var options = menu.lastElementChild;
    title.innerHTML = getOrderText();
    options.innerHTML = "<span onclick=\"javascript:coast(0)\">North Coast</span> / <span onclick=\"javascript:coast(1)\">South Coast</span>";
    menu.style.left = (event.pageX + 10) + "px";
    menu.style.top = (event.pageY + 10) + "px";
    menu.style.visibility = "visible";
}
function coast(coast) { // 0 = North, 1 = South
    document.getElementById("menu").style.visibility = "hidden";
    if (coast == 0) {
        prepare(getTmpOrder().getAttribute("obj1") + "n", 1);
    } else {
        prepare(getTmpOrder().getAttribute("obj1") + "s", 1);
    }
    appendOrder();
    setStatus("wait");
}
function support() {
    document.getElementById("menu").style.visibility = "hidden";
    prepare("S", 1);
    setStatus("sup");
}
function supOrder(obj, event) {
    var supporter = getUnit().slice(0, 3);
    var receiver = obj.id;
    if (receiver == supporter) return;
    if (getUnitType(receiver) == "") return;
    var menu = document.getElementById("menu");
    var title = menu.firstElementChild.firstElementChild;
    var options = menu.lastElementChild;
    options.innerHTML = ""; 
    if (legalMove(supporter, receiver, false)) options.innerHTML += "<span onclick=\"javascript:supHold()\">Hold</span>";
    var supGoal = graph[supporter];
    for (let i = 0; i < supGoal.length; ++i) {
        if (legalMove(receiver, supGoal[i], true) && legalMove(supporter, supGoal[i], false)) {
            options.innerHTML += " <span onclick=\"javascript:supMove()\">Move</span>";
            break;
        }
    }
    if (options.innerHTML == "") {
        menu.style.visibility = "hidden";
        return;
    }
    prepare(receiver, 2);
    title.innerHTML = getOrderText();
    menu.style.left = (event.pageX + 10) + "px";
    menu.style.top = (event.pageY + 10) + "px";
    menu.style.visibility = "visible";
}
function supHold() {
    document.getElementById("menu").style.visibility = "hidden";
    prepare("H", 3);
    appendOrder();
    setStatus("wait");
}
function supMove() {
    document.getElementById("menu").style.visibility = "hidden";
    getTmpOrder().innerHTML += " -";
    setStatus("supMove");
}
function supMoveTo(obj) {
    if (!legalMove(getTmpOrder().getAttribute("obj2"), obj.id, true) || !legalMove(getUnit().slice(0, 3), obj.id, false)) return;
    prepare(obj.id, 3);
    appendOrder();
    setStatus("wait");
}
function convoy() {
    document.getElementById("menu").style.visibility = "hidden";
    prepare("C", 1);
    setStatus("con");
}
function conOrder(obj) {
    if (getUnitType(obj.id) != "army") return;
    if (getProvType(obj.id) != "coast") return;
    prepare(obj.id, 2);
    setStatus("conMove");
}
function conMoveTo(obj) {
    if (getProvType(obj.id) != "coast") return;
    if (!legalMove(getTmpOrder().getAttribute("obj2"), obj.id, true)) return;
    prepare(obj.id, 3);
    appendOrder();
    setStatus("wait");
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
    var ret = [];

    var infoObj = document.getElementById("info");
    var info = [infoObj.getAttribute("user"), infoObj.getAttribute("role"), infoObj.getAttribute("gameid"), infoObj.getAttribute("turn")];
    ret.push(info);

    var orders = document.getElementById("orders").getElementsByClassName("order");
    for (let i = 0; i < orders.length; ++i) {
        let order = [orders[i].getAttribute("unit"), orders[i].getAttribute("obj1"), orders[i].getAttribute("obj2"), orders[i].getAttribute("obj3")];
        ret.push(order);
    }
    var xmlhttp;
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function() {
        document.getElementById("result").innerHTML = "傳送中";
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // document.getElementById("result").innerHTML = xmlhttp.responseText;
            showResult(xmlhttp.responseText);
        }
    }
    xmlhttp.open("POST", "https://diplomacy.guru/solver", true);
    xmlhttp.setRequestHeader("Content-type", "application/json;charset=utf-8");
    xmlhttp.send(JSON.stringify(ret));
}