import React from 'react';
import Paper from 'material-ui/Paper';
import Center from './center';

import { grey700 } from 'material-ui/styles/colors';
import { gutter } from './styles';

const styles = {
    heading: {
        color: grey700,
        fontSize: '1.75em',
        marginBottom: '1em'
    },
    container: {
        margin: '0 auto',
        maxWidth: 400
    },
    content: {
        margin: `0 ${gutter / 2}px`
    }
};

export default function Form(props) {
    return (
        <Center>
            <form style={styles.container} onSubmit={props.onSubmit}>
                {
                    props.heading &&
                    <h1 style={styles.heading}>
                        {props.heading}
                    </h1>
                }
                <Paper style={styles.content}>
                    {props.children}
                </Paper>
            </form>
        </Center>
    );
}

Form.propTypes = {
    onSubmit: React.PropTypes.func,
    heading: React.PropTypes.string,
    children: React.PropTypes.node
};
