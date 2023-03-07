function Grid(args = {}) {
    const _this = this;
    
    // Properties.
    this.element;
    this.buttons;
    this.colCount = 0;
    this.rowCount = 0;
    this.cellColor = '#FFF';

    this.init = function(args) {
        this.element = document.querySelector(args.element);        
        this.buttons = document.querySelector(args.buttons);        
        this.colCount = args.colCount;
        this.rowCount = args.rowCount;
        this.cellColor = args.cellColor || '#FFF';
        this.listeners();
    }

    this.listeners = function() {
        this.getButton('add-row').addEventListener('click', function() {
            _this.addRow();
            _this.displayCounts();
        });

        this.getButton('add-column').addEventListener('click', function() {
            _this.addCol();
            _this.displayCounts();
        });

        this.getButton('remove-row').addEventListener('click', function() {
            _this.removeRow();
            _this.displayCounts();
        });

        this.getButton('remove-column').addEventListener('click', function() {
            _this.removeCol();
            _this.displayCounts();
        });

        this.getButton('color').addEventListener('change', function(e) {
            _this.color = e.target.value;
        });

        this.getButton('fill-all-uncolored').addEventListener('click', function() {
            _this.fillCells('uncolored');
        });

        this.getButton('fill-all').addEventListener('click', function() {
            _this.fillCells();
        });

        this.getButton('clear-all').addEventListener('click', function() {
            _this.clearCells();
        })

        this.element.addEventListener('click', function(e) {
            const cell = e.target;
            const cellID = cell.getAttribute('id');
            const row = cellID.split('-')[1];
            const col = cellID.split('-')[2];
            _this.setCellColor(row, col, _this.color);
        });
    }

    this.getButton = function(button = '') {
        return this.buttons.querySelector(`#${button}`);
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

    this.setCellColor = function(row = 1, col = 1, color = '#FFF') {
        this.getCell(row, col).style.backgroundColor = color;
    }

    this.getCellColor = function(row = 1, col = 1) {
        return this.getCell(row, col).style.backgroundColor;
    }

    this.clearCellColor = function(row = 1, col = 1) {
        this.getCell(row, col).style.backgroundColor = '';
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

    this.removeCol = function(col = -1) {
        // If there are no columns, do nothing.
        if (this.colCount === 0) {
            return;
        }

        // Default to removing the last column.
        if (col === -1) {
            col = this.colCount;
        }

        // Remove the cell from each row.
        for (let i = 1; i <= this.rowCount; i++) {
            this.getRow(i).removeChild(this.getCell(i, col));
        }

        this.colCount--;
    }

    this.fillCells = function(type = 'all') {
        for (let r = 1; r <= this.rowCount; r++) {
            for (let c = 1; c <= this.colCount; c++) {
                if (type == 'all' || (type == 'uncolored' && (this.getCellColor(r, c) === '' || this.getCellColor(r, c) == 'rgb(255, 255, 255)'))) {
                    this.setCellColor(r, c, this.color);
                }
            }
        }
    }

    this.clearCells = function() {
        for (let r = 1; r <= this.rowCount; r++) {
            for (let c = 1; c <= this.colCount; c++) {
                this.clearCellColor(r, c);
            }
        }
    }

    this.displayCounts = function() {
        this.getButton('row-count').innerHTML = this.rowCount;
        this.getButton('col-count').innerHTML = this.colCount;
        this.getButton('cell-count').innerHTML = this.rowCount * this.colCount;
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