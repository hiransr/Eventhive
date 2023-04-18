import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MyEventCards({ eventHeading, eventImage, navigateURL, onDelete }) {
  // console.log(navigateURL);
  return (
    <Card sx={{ width: 280 }}>

      <CardMedia className='!w-full h-[120px]'
        component="img"
        image={eventImage}
        alt="green iguana"
      />
      <CardContent className='h-[100px] overflow-auto' >
        <h2 className='text-xl font-bold'>
          {eventHeading}
        </h2>
      </CardContent>

      <CardActions>
        <div className='flex flex-1'>
          <Link to={navigateURL}>
            <Button size="small" color="primary">
              View
            </Button>
          </Link>
        </div>
        <div>
          <IconButton onClick={onDelete}>
            <DeleteIcon className="!text-decline" />
          </IconButton>
        </div>

      </CardActions>
    </Card>
  );
}

