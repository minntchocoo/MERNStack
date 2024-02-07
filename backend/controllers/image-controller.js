const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = require('../db');


const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { originalname, mimetype, buffer } = req.file;

    const fileExtension = originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName); // Adjust the folder path as needed

    fs.writeFileSync(filePath, buffer);

    const query = 'INSERT INTO images (name, file_path, content_type) VALUES ($1, $2, $3) RETURNING *';
    const values = [originalname, filePath, mimetype];

    const result = await pool.query(query, values);

    return res.status(201).json({ message: 'Image saved successfully.', image: result.rows[0] });
  } catch (error) {
    console.error('Error saving image:', error);
    return res.status(500).json({ message: 'Error saving the image.' });
  }
};

const getImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const query = 'SELECT * FROM images WHERE id = $1';
    const values = [imageId];

    const result = await pool.query(query, values);
    const image = result.rows[0];

    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }

    res.sendFile(image.file_path);
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ message: 'Error fetching the image.' });
  }
};

const getAllImages = async (req, res) => {
  try {
    const query = 'SELECT * FROM images';
    const result = await pool.query(query);
    const images = result.rows;

    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No images found.' });
    }

    return res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ message: 'Error fetching images.' });
  }
};

const getImageByName = async (req, res) => {
  try {
    const imageName = req.params.name;

    const query = 'SELECT * FROM images WHERE name = $1';
    const values = [imageName];

    const result = await pool.query(query, values);
    const image = result.rows[0];

    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }

    res.sendFile(image.file_path);
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ message: 'Error fetching the image.' });
  }
};

module.exports = {
  uploadImage,
  getImage,
  getAllImages,
  getImageByName
};
