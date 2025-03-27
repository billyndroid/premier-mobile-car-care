// Responsive Matrix Chart - Vanilla JavaScript Implementation
class ResponsiveMatrixChart {
    constructor(options = {}) {
        // Default configuration
        this.config = {
            // Target element to render the chart
            target: options.target || document.body,
            
            // Default data structure
            data: options.data || {
                headers: ['Category A', 'Category B', 'Category C', 'Category D'],
                rows: [
                    { label: 'Row 1', values: [10, 15, 20, 25] },
                    { label: 'Row 2', values: [30, 35, 40, 45] },
                    { label: 'Row 3', values: [50, 55, 60, 65] },
                    { label: 'Row 4', values: [70, 75, 80, 85] }
                ]
            },
            
            // Number of columns per page on small screens
            columnsPerPage: options.columnsPerPage || 2
        };

        // Current state
        this.state = {
            currentPage: 0
        };

        // Render the chart
        this.render();
    }

    // Calculate total pages based on headers and columns per page
    calculateTotalPages() {
        return Math.ceil(this.config.data.headers.length / this.config.columnsPerPage);
    }

    // Get columns for current page
    getCurrentPageColumns() {
        const start = this.state.currentPage * this.config.columnsPerPage;
        const end = start + this.config.columnsPerPage;
        return this.config.data.headers.slice(start, end);
    }

    // Create navigation buttons
    createNavigationButtons(totalPages) {
        const navContainer = document.createElement('div');
        navContainer.className = 'navigation-container';

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&lt;';
        prevButton.className = `nav-button ${this.state.currentPage === 0 ? 'disabled' : ''}`;
        if (this.state.currentPage > 0) {
            prevButton.addEventListener('click', () => this.changePage(-1));
        }

        // Page indicator
        const pageIndicator = document.createElement('span');
        pageIndicator.className = 'page-indicator';
        pageIndicator.textContent = `Page ${this.state.currentPage + 1} of ${totalPages}`;

        // Next button
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&gt;';
        nextButton.className = `nav-button ${this.state.currentPage === totalPages - 1 ? 'disabled' : ''}`;
        if (this.state.currentPage < totalPages - 1) {
            nextButton.addEventListener('click', () => this.changePage(1));
        }

        navContainer.appendChild(prevButton);
        navContainer.appendChild(pageIndicator);
        navContainer.appendChild(nextButton);

        return navContainer;
    }

    // Change page method
    changePage(direction) {
        const totalPages = this.calculateTotalPages();
        this.state.currentPage = Math.max(0, Math.min(totalPages - 1, this.state.currentPage + direction));
        this.render();
    }

    // Main render method
    render() {
        // Clear previous content
        if (typeof this.config.target === 'string') {
            this.config.target = document.querySelector(this.config.target);
        }
        this.config.target.innerHTML = '';

        // Create main container
        const container = document.createElement('div');
        container.className = 'matrix-chart-container';

        // Create table
        const table = document.createElement('table');
        table.className = 'matrix-chart-table';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // First header cell (Category)
        const categoryHeader = document.createElement('th');
        categoryHeader.textContent = 'Category';
        categoryHeader.className = 'category-header';
        headerRow.appendChild(categoryHeader);

        // Get current page columns
        const currentPageColumns = this.getCurrentPageColumns();

        // Render dynamic headers
        currentPageColumns.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.className = 'header-cell';
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        // Render rows
        this.config.data.rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'data-row';

            // Row label cell
            const labelCell = document.createElement('td');
            labelCell.textContent = row.label;
            labelCell.className = 'label-cell';
            tr.appendChild(labelCell);

            // Render value cells for current page columns
            currentPageColumns.forEach(col => {
                const valueCell = document.createElement('td');
                const colIndex = this.config.data.headers.indexOf(col);
                valueCell.textContent = row.values[colIndex];
                valueCell.className = 'value-cell';
                tr.appendChild(valueCell);
            });

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        // Add navigation if multiple pages
        const totalPages = this.calculateTotalPages();
        if (totalPages > 1) {
            const navButtons = this.createNavigationButtons(totalPages);
            container.appendChild(navButtons);
        }

        // Append to target
        this.config.target.appendChild(container);
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    // Basic usage
    new ResponsiveMatrixChart({
        target: '#matrix-container',
        data: {
            headers: ['Q1', 'Q2', 'Q3', 'Q4'],
            rows: [
                { label: 'Sales', values: [1000, 1200, 1500, 1800] },
                { label: 'Expenses', values: [800, 900, 1000, 1100] },
                { label: 'Profit', values: [200, 300, 500, 700] }
            ]
        }
    });
});