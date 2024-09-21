import React, { useState, useRef} from 'react';
import { Card, Container, Dropdown } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <FaEllipsisV
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ color: 'gray', fontSize: '24px', cursor: 'pointer' }}
    />
  ));

export default function SongCard({ song, onEdit, onDelete  }) {

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <Container>
            <Card style={{ width: "30rem" }}>
                <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                        <Card.Title>{song.title}</Card.Title>
                        <Card.Text>{song.artist}</Card.Text>
                    </div>
                    <div className="d-flex align-items-center">
                    {liked ? (
                        <FaHeart
                            style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }}
                            onClick={toggleLike}
                        />
                    ) : (
                        <FaRegHeart
                            style={{ color: 'gray', cursor: 'pointer', fontSize: '24px' }}
                            onClick={toggleLike}
                        />
                    )}
                    <Dropdown align="end">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

              <Dropdown.Menu>
                <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={onDelete} style={{ color: 'red' }}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
                    </div>
                </Card.Body>
            </Card>
        </Container >
    );
}
