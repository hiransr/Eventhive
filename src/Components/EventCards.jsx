import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EventCards({ eventHeading, imgName, eventDesp, navigateURL }) {
  // console.log(navigateURL);
  return (
    <Card sx={{ width: 280 }}>

      <CardMedia className='!w-full h-[120px]'
        component="img"
        image={imgName}
        alt="green iguana"
      />
      <CardContent className='h-[150px] overflow-auto' >
        <h2 className='text-xl font-bold'>
          {eventHeading}
        </h2>
        <p>
          {eventDesp}
        </p>
      </CardContent>

      <CardActions>
        <Link to={navigateURL}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>

      </CardActions>
    </Card>
  );
}

