function Grid(args = {}) {
    const _this = this;
    
    this.element;
    this.buttons;
    this.colCount = 0;
    this.rowCount = 0;

    this.init = function(args) {
        this.element = document.querySelector(args.element);        
        this.buttons = document.querySelector(args.buttons);        
        this.colCount = args.colCount;
        this.rowCount = args.rowCount;
        this.listeners();
    }

    this.getButton = function(button = '') {
        return this.buttons.querySelector(`#${button}`);
    }

    this.listeners = function() {
        this.getButton('add-row').addEventListener('click', function() {
            _this.addRow();
        });
    }

    this.addRow = function() {
        this.rowCount++;
        console.log('add row!', this.rowCount);

        const row = document.createElement('tr');
        row.setAttribute('id', `row-${this.rowCount}`);

        // to become a function (addCol)
        for (let i = 1; i <= this.colCount; i++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `cell-${this.rowCount}-${i}`);
            cell.innerHTML = `Cell ${this.rowCount}-${i}`;
            row.appendChild(cell);
        }

        this.element.appendChild(row);
    }

    // Self-init.
    this.init(args);

}

const grid = new Grid({
    element: '#grid',
    buttons: '#buttons',
    colCount: 1,
    rowCount: 0
});

console.log(grid);