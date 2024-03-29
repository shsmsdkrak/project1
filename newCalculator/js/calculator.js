import CalcGenerator from "./calcGenerator.js";
import CalcOperator from "./calcOperator.js";
import CalcHtmlView from "./view/calcHtmlView.js";

export default class Calculator {
    constructor(parentID) {
        this.itemList = [];
        this.historyData = [];
        this.calcGenerator = new CalcGenerator();
        this.calcHtmlView = new CalcHtmlView(parentID);
        this.setItems(this.onInitContents());
    }

    render() {
        const viewData = this.getItems();
        this.calcHtmlView.render(viewData);
    }

    // override
    onInitContents() {}

    setItems(items) {
        this.itemList.push(items);
    }

    getItems() {
        return this.itemList;
    }

    getHistoryData() {
        return this.historyData;
    }

    toCamelCase(str) {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    // @TODO 제거
    find(items, callback) {
        items.forEach((item) => {
            const itemList = item.itemList;

            callback(item);

            if (itemList && itemList.length > 0) {
                this.find(itemList, callback);
            }
        });
    }

    getControl(id) {
        const items = this.getItems();
        let control = null;

        this.find(items, (citem) => {
            if (citem.id === id) {
                control = citem;
            }
        });

        return control;
    }
    
    setReadOnly(id, flag) {
        this.setState(id, "disabled", flag);
    }

    setValue(id, value) {
        this.setState(id, "value", value);
    }

    setLabel(id, label) {
        this.setState(id, "innerText", label);
    }

    showDisplay(id) {
        this.setState(id, "className", "show");
    }

    hideDisplay(id) {
        this.setState(id, "className", "hide");
    }

    setState(id, state, value) {
        const items = this.getItems();

        // 1. 데이터의 속성값을 찾아 변경해준다.
        this.find(items, item => {
            if (item.id === id) {
                item[state] = value;
            }
        });

        // 2. 데이터 속성값을 변경 후 HTML을 업데이트 해준다.
        this.calcHtmlView.render(items, state);
    }
}