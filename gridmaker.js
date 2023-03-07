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

        this.getButton('add-column').addEventListener('click', function() {
            _this.addCol();
        });

        this.getButton('remove-row').addEventListener('click', function() {
            _this.removeRow();
        });
    }

    this.getCell = function(row = 1, col = 1) {
        return this.element.querySelector(`#cell-${row}-${col}`);
    }

    this.createCell = function(row = 1, col = 1) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('id', `cell-${row}-${col}`);
        cellElement.innerHTML = `Cell ${row}-${col}`;
        return cellElement;
    }

    this.addCell = function(row = 1, col = 1) {
        this.getRow(row).appendChild(this.createCell(row, col));
    }

    this.getRow = function(row = 1) {
        return this.element.querySelector(`#row-${row}`);
    }

    this.createRow = function(row = 1) {
        const rowElement = document.createElement('tr');
        rowElement.setAttribute('id', `row-${row}`);
        return rowElement;
    }

    this.addRow = function() {
        this.rowCount++;

        // Add a new row to the table.
        this.element.appendChild(this.createRow(this.rowCount));

        // If there are no columns, add at least one.
        if (this.colCount === 0) {
            this.colCount++;
        }

        // Add cells to the new row (one for each column).
        for (let i = 1; i <= this.colCount; i++) {
            this.addCell(this.rowCount, i);
        }
    }

    this.addCol = function(row = 1) {
        // If there are no rows, add one.
        if (this.rowCount === 0) {
            this.addRow();
            return;
        }

        this.colCount++;

        // Add a new cell to each row.
        for (let i = 1; i <= this.rowCount; i++) {
            this.addCell(i, this.colCount);
        }
    }

    this.removeRow = function(row = -1) {
        // If there are no rows, do nothing.
        if (this.rowCount === 0) {
            return;
        }

        // Default to removing the last row.
        if (row === -1) {
            row = this.rowCount;
        }

        this.element.removeChild(this.getRow(row));
        this.rowCount--;
    }

    // Self-init.
    this.init(args);

}

const grid = new Grid({
    element: '#grid',
    buttons: '#buttons',
    colCount: 0,
    rowCount: 0
});

console.log(grid);