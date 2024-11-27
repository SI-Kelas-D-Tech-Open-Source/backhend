
import db from "../database/db.js";

// Function to get all languages or a specific language by ID
export const getLanguages = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters

        // If an ID is provided, fetch the specific language
        if (id) {
            const query = 'SELECT * FROM languages WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    console.error("Error retrieving data:", error);
                    return res.status(500).json({
                        code: 500,
                        message: "Internal Server Error"
                    });
                }

                // Check if any language was found
                if (results.length === 0) {
                    return res.status(404).json({
                        code: 404,
                        message: "Language not found."
                    });
                }

                // Respond with the found language
                res.status(200).json({
                    code: 200,
                    data: results[0] // Return the first matching language
                });
            });
        } else {
            // If no ID is provided, fetch all languages
            const query = 'SELECT * FROM languages';
            db.query(query, (error, results) => {
                if (error) {
                    console.error("Error retrieving data:", error);
                    return res.status(500).json({
                        code: 500,
                        message: "Internal Server Error"
                    });
                }

                // Respond with all languages
                res.status(200).json({
                    code: 200,
                    data: results // Return all languages
                });
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        });
    }
};

export const getLanguageById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM languages WHERE id = ?';
        db.query(query, [id], (error, results) => {
            if (error) {
                console.error("Error retrieving data:", error);
                return res.status(500).json({
                    code: 500,
                    message: "Internal Server Error"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Bahasa tidak ditemukan"
                });
            } else {
                res.status(200).json({
                    code: 200,
                    data: results[0] // Return the first matching language
                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
}

export const createLanguage = async (req, res) => {
    try {
        const { indonesia, gorontalo, kategori, kesopanan, kalimat, gambar, suara } = req.body;
        console.log(req.body)


        if(!indonesia || !gorontalo || !kategori || !kesopanan || !kalimat || !gambar || !suara) {
            return res.status(400).json({
                code: 400,
                message: "All fields are required."
            })
        }

        // SQL query to insert a new language entry
        const query = 'INSERT INTO languages (indonesia, gorontalo, kategori, kesopanan, kalimat, gambar, suara) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [indonesia, gorontalo, kategori, kesopanan, kalimat, gambar, suara];

        // Execute the query
        db.query(query, values, (error, results) => {
            if (error) {
                console.error("Error inserting data:", error);
                return res.status(500).json({
                    code: 500,
                    message: "Internal Server Error"
                });
            }

            // Respond with success
            res.status(201).json({
                data: {
                    id: results.insertId, // Get the ID of the newly created record
                    indonesia,
                    gorontalo,
                    kategori,
                    kalimat,
                    gambar,
                    suara
                },
                code: 201,
                message: "Language Created"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        });
    }
};

export const editLanguage = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        const { indonesia, gorontalo, kategori, kesopanan, kalimat, gambar, suara } = req.body;

        // Check if the ID is provided
        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "Language ID is required."
            });
        }

        // SQL query to update an existing language entry
        const query = `
            UPDATE languages 
            SET indonesia = ?, 
                gorontalo = ?, 
                kategori = ?, 
                kesopanan = ?, 
                kalimat = ?, 
                gambar = ?, 
                suara = ? 
            WHERE id = ?
        `;
        const values = [indonesia, gorontalo, kategori, kesopanan, kalimat, gambar, suara, id];

        // Execute the query
        db.query(query, values, (error, results) => {
            if (error) {
                console.error("Error updating data:", error);
                return res.status(500).json({
                    code: 500,
                    message: "Internal Server Error"
                });
            }

            // Check if any rows were affected (i.e., if the update was successful)
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Language not found."
                });
            }

            // Respond with success
            res.status(200).json({
                data: {
                    id,
                    indonesia,
                    gorontalo,
                    kategori,
                    kesopanan,
                    kalimat,
                    gambar,
                    suara
                },
                code: 200,
                message: "Language Updated"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        });
    }
};

export const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters

        // Check if the ID is provided
        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "Language ID is required."
            });
        }

        // SQL query to delete the language entry
        const query = 'DELETE FROM languages WHERE id = ?';
        const values = [id];

        // Execute the query
        db.query(query, values, (error, results) => {
            if (error) {
                console.error("Error deleting data:", error);
                return res.status(500).json({
                    code: 500,
                    message: "Internal Server Error"
                });
            }

            // Check if any rows were affected (i.e., if the delete was successful)
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Language not found."
                });
            }

            // Respond with success
            res.status(200).json({
                code: 200,
                message: "Language Deleted"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        });
    }
};