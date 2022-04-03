/* eslint-disable */

import React, { useState, useCallback, useEffect } from 'react';
import APIService from '../../services/api-service';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  TablePagination,
  Paper,
  Box,
  Modal,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { theme } from '../../styles/theme';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: theme.palette.white.main,
  border: 'none',
  boxShadow: 24,
  outline: 'none',
  p: 4,
};

const ManagementTable = () => {
  const [boats, setBoats] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState({});
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const navigate = useNavigate();

  const navigateToAddBoat = () => navigate(`/management/add`);

  const navigateToEditBoat = useCallback(
    (id) => {
      navigate(`/management/edit/${id}`);
    },
    [navigate]
  );

  const handleDelete = (boat) => {
    setSelectedBoat(boat);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => setIsDeleteModalOpen(false);

  useEffect(() => {
    (async () => {
      const fetchedManagementBoats = await APIService.fetchFormatedBoats();
      setBoats(fetchedManagementBoats);
    })();
  }, []);

  const deleteBoat = (id) => {
    APIService.deleteBoat(id).then(() => {
      handleModalClose(false);
      (async () => {
        const fetchedManagementBoats = await APIService.fetchAllBoats();
        setBoats(fetchedManagementBoats);
      })();
    });
  };

  const columns = [
    'Id',
    'Image',
    'Title',
    'Type',
    'Price',
    'Actions',
  ];

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Button
        variant="contained"
        sx={{ width: 150, height: 50, mb: '20px' }}
        onClick={navigateToAddBoat}
      >
        Add new boat
      </Button>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete boat `{selectedBoat.title}`?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteBoat(selectedBoat.id)}
              sx={{ marginRight: '15px' }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Paper elevation={3}>
        <Box display="flex" flexDirection="column" flex={1}>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      <Typography variant="h6">{column}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? boats.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : boats
                ).map((boat) => {
                  return (
                    <>
                      <TableRow key={boat.id} title="tableRow" hover>
                        <TableCell>{boat.id}</TableCell>
                        <TableCell align="left">
                          <img
                            className="grid-image"
                            style={{ width: 100, height: 150 }}
                            src={boat.img}
                            alt="#"
                          />
                        </TableCell>
                        <TableCell align="left">{boat.title}</TableCell>
                        
                        <TableCell align="left">{boat.type}</TableCell>
                        <TableCell align="left">{boat.price}</TableCell>
                        <TableCell>
                          <ModeEditOutlineOutlinedIcon
                            onClick={() => navigateToEditBoat(boat.id)}
                          />
                          <HighlightOffOutlinedIcon
                            onClick={() => handleDelete(boat)}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          flex={1}
          padding={1}
          paddingRight={10}
        >
          <TablePagination
            page={page}
            rowsPerPage={5}
            count={boats.length}
            rowsPerPageOptions={[5]}
            shape="rounded"
            color="primary"
            onPageChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ManagementTable;
