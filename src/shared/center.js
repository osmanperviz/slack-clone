import React from 'react';

const styles = {
    table: {
        display: 'table',
        width: '100%',
        height: '100%'
    },
    cell: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle',
    }
};

export default function Center(props) {
    return (
        <div style={styles.table}>
            <div style={styles.cell}>
                {props.children}
            </div>
        </div>
    );
}

Center.propTypes = {
    children: React.PropTypes.node
};
