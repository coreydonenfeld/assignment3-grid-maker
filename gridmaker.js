function Grid(args = {}) {
    const _this = this;
    
    this.element;
    this.colCount;
    this.rowCount;

    this.init = function(args) {
        this.element = document.querySelector(args.element);
        this.colCount = args.colCount;
        this.rowCount = args.rowCount;
    }

}

const grid = new Grid({
    element: '#grid',
    colCount: 10,
    rowCount: 10
});

console.log(grid);