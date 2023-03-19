/**
 * Grid Maker.
 * 
 * @param {*} args The arguments.
 * @param {string} args.element The selector of the table element.
 * @param {string} args.buttons The selector of the buttons element.
 * @param {number} args.colCount The number of initial columns.
 * @param {number} args.rowCount The number of initial rows.
 */
function GridMaker(args = {}) {
    const _this = this;
    
    // Properties.
    this.element;
    this.buttons;
    this.colCount = 0;
    this.rowCount = 0;
    this.cellColor = '#FFF';

    /**
     * Init.
     * 
     * @param {*} args The arguments.
     * @param {string} args.element The selector of the table element.
     * @param {string} args.buttons The selector of the buttons element.
     * @param {number} args.colCount The number of initial columns.
     * @param {number} args.rowCount The number of initial rows.
     * @param {string} args.cellColor The color of the cells.
     * @return void
     */
    this.init = function(args) {
        this.element = document.querySelector(args.element);        
        this.buttons = document.querySelector(args.buttons);        
        this.cellColor = args.cellColor || '#FFF';

        // Add initial rows and columns.
        if (args.rowCount > 0) {
            for (let r = 1; r <= args.rowCount; r++) {
                this.addRow();
            }
        }
        if (args.colCount > 0) {
            this.colCount = 0;
            for (let c = 1; c <= args.colCount; c++) {
                this.addCol();
            }
        }

        // Display the initial counts.
        this.displayCounts();

        // Add event listeners.
        this.listeners();
    }

    /**
     * Listeners.
     * 
     * @return void
     */
    this.listeners = function() {
        /**
         * Add a row.
         */
        this.getButton('add-row').addEventListener('click', function() {
            _this.addRow();
            _this.displayCounts();
        });

        /**
         * Add a column.
         */
        this.getButton('add-column').addEventListener('click', function() {
            _this.addCol();
            _this.displayCounts();
        });

        /**
         * Remove a row.
         */
        this.getButton('remove-row').addEventListener('click', function() {
            _this.removeRow();
            _this.displayCounts();
        });

        /**
         * Remove a column.
         */
        this.getButton('remove-column').addEventListener('click', function() {
            _this.removeCol();
            _this.displayCounts();
        });

        /**
         * Update the color.
         */
        this.getButton('color').addEventListener('change', function(e) {
            _this.color = e.target.value;
        });

        /**
         * Fill all uncolored cells.
         */
        this.getButton('fill-all-uncolored').addEventListener('click', function() {
            _this.fillCells('uncolored');
        });

        /**
         * Fill all cells.
         */
        this.getButton('fill-all').addEventListener('click', function() {
            _this.fillCells();
        });

        /**
         * Clear all cells.
         */
        this.getButton('clear-all').addEventListener('click', function() {
            _this.clearCells();
        })

        /**
         * Color an individual cell.
         */
        this.element.addEventListener('click', function(e) {
            const cell = e.target;
            const cellID = cell.getAttribute('id');
            const row = cellID.split('-')[1];
            const col = cellID.split('-')[2];
            _this.setCellColor(row, col, _this.color);
        });
    }

    /**
     * Get a button.
     * 
     * @param {string} button The button ID (without the #).
     * @return {HTMLElement} The button element.
     */
    this.getButton = function(button = '') {
        return this.buttons.querySelector(`#${button}`);
    }

    /**
     * Get a cell.
     * 
     * @param {Number} row The row number.
     * @param {Number} col The column number.
     * @returns {HTMLElement|null} The cell element or null if not found.
     */
    this.getCell = function(row = 1, col = 1) {
        return this.element.querySelector(`#cell-${row}-${col}`);
    }

    /**
     * Create a cell element.
     * 
     * @param {Number} row The row number.
     * @param {Number} col The column number.
     * @returns {HTMLElement} The cell element.
     */
    this.createCell = function(row = 1, col = 1) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('id', `cell-${row}-${col}`);
        cellElement.innerHTML = `Cell ${row}-${col}`;
        return cellElement;
    }

    /**
     * Add a cell to the table.
     * 
     * @param {Number} row The row number.
     * @param {Number} col The column number.
     * @returns void
     */
    this.addCell = function(row = 1, col = 1) {
        if (this.getCell(row, col)) {
            return;
        }

        this.getRow(row).appendChild(this.createCell(row, col));
    }

    /**
     * Set the color of a cell.
     * 
     * @param {Number} row The row number.
     * @param {Number} col The column number.
     * @param {String} color The color hex code.
     */
    this.setCellColor = function(row = 1, col = 1, color = '#FFF') {
        this.getCell(row, col).style.backgroundColor = color;
    }

    /**
     * Get the color of a cell.
     * 
     * @param {Number} row The row number.
     * @param {Number} col The column number.
     * @returns {String} The color hex code.
     */
    this.getCellColor = function(row = 1, col = 1) {
        return this.getCell(row, col).style.backgroundColor;
    }

    /**
     * Clear the color of a cell.
     * 
     * @param {Number} row The row number.
     * @param {Number} col The column number.
     * @returns void
     */
    this.clearCellColor = function(row = 1, col = 1) {
        this.getCell(row, col).style.backgroundColor = '';
    }

    /**
     * Get a row.
     * 
     * @param {Number} row The row number.
     * @returns {HTMLElement|null} The row element or null if not found.
     */
    this.getRow = function(row = 1) {
        return this.element.querySelector(`#row-${row}`);
    }

    /**
     * Create a row element.
     * 
     * @param {Number} row The row number.
     * @returns {HTMLElement} The row element.
     */
    this.createRow = function(row = 1) {
        const rowElement = document.createElement('tr');
        rowElement.setAttribute('id', `row-${row}`);
        return rowElement;
    }

    /**
     * Add a row to the table.
     */
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

    /**
     * Add a column to the table.
     * 
     * @param {Number} row The row number. Default is 1.
     * @returns null
     */
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

    /**
     * Remove a row from the table.
     * 
     * @param {Number} row The row number. Default is the last row.
     * @returns null
     */
    this.removeRow = function(row = -1) {
        // If there are no rows, do nothing.
        if (this.rowCount === 0) {
            return;
        }

        // Default to removing the last row.
        if (row === -1) {
            row = this.rowCount;
        }

        // Remove the row.
        this.element.removeChild(this.getRow(row));
        this.rowCount--;

        // If there are no columns, set the row count to zero.
        if (this.rowCount === 0) {
            this.colCount = 0;
        }
    }

    /**
     * Remove a column from the table.
     * 
     * @param {Number} col The column number. Default is the last column.
     * @returns null
     */
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

        // If there are no columns, set the row count to zero.
        if (this.colCount === 0) {
            this.rowCount = 0;
        }
    }

    /**
     * Fill all cells with the current color.
     * 
     * @param {String} type The type of cells to fill. Default is 'all'. Options are 'all' and 'uncolored'.
     */
    this.fillCells = function(type = 'all') {
        for (let r = 1; r <= this.rowCount; r++) {
            for (let c = 1; c <= this.colCount; c++) {
                if (type == 'all' || (type == 'uncolored' && (this.getCellColor(r, c) === '' || this.getCellColor(r, c) == 'rgb(255, 255, 255)'))) {
                    this.setCellColor(r, c, this.color);
                }
            }
        }
    }

    /**
     * Clear all cell colors.
     */
    this.clearCells = function() {
        for (let r = 1; r <= this.rowCount; r++) {
            for (let c = 1; c <= this.colCount; c++) {
                this.clearCellColor(r, c);
            }
        }
    }

    /**
     * Display the current row, column, and cell counts.
     */
    this.displayCounts = function() {
        this.getButton('row-count').innerHTML = this.rowCount;
        this.getButton('col-count').innerHTML = this.colCount;
        this.getButton('cell-count').innerHTML = this.rowCount * this.colCount;
    }

    // Self-init.
    this.init(args);

}

const grid = new GridMaker({
    element: '#grid',
    buttons: '#buttons',
    colCount: 0,
    rowCount: 0
});