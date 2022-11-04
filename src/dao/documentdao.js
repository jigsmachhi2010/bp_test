const document_superadmin = require("../modal/document_superadmin");

class DocumentDAO {
  constructor() {}

  findAndUpdateDocument(subjectId, userData, filename) {
    console.log("filename", subjectId, userData, filename);
    return document_superadmin.findByIdAndUpdate(
      { _id: subjectId },
      { ...userData.payload, document_files: userData.filename },
      {
        new: true,
      }
    );
  }

  findAndDeleteDocument(subjectId) {
    return document_superadmin.deleteOne(
      { _id: subjectId },
      {
        new: true,
      }
    );
  }
}

module.exports = new DocumentDAO();
