function selectNodes(path, xml) {
    //if(!window.ActiveXObject)
    if (typeof XPathEvaluator != "undefined" ) {
        var oEvaluator = new XPathEvaluator();
        var oResult = oEvaluator.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        var aNodes = new Array();
        if (oResult != null) {
            var oElement = oResult.iterateNext();
            while (oElement) {
                aNodes.push(oElement);
                oElement = oResult.iterateNext();
            }
        }
        return aNodes;
    }
    else {
        return xml.selectNodes(path);
    }
}

function selectSingleNode(path, xml) {
    if (typeof XPathEvaluator != "undefined") {
        var oEvaluator = new XPathEvaluator();
        // FIRST_ORDERED_NODE_TYPE returns the first match to the xpath.
        var oResult = oEvaluator.evaluate(path, xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (oResult != null) {
            return oResult.singleNodeValue;
        }
        else {
            return null;
        }
    }
    else {
        return xml.selectSingleNode(path);
    }
}