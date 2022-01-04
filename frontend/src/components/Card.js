import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard(props) {

    let value = "";
    if (props.count !== undefined) {
        value = props.count;
    }

    return (
        <Box sx={{ minWidth: 275 }} pt={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography>
                        {value}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
