const model = require("../Model/index.js");
const { Op } = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
  try {
    if (req.query.ItemId) {
      let scrap = await model.scrap.findAll({
        where: {
          ItemId: req.query.ItemId,
        },
      });
      if (scrap.length > 0) {
        res.status(200).json({
          message: "Data Ditemukan",
          data: scrap,
        });
      } else {
        res.status(200).json({
          message: "Data Tidak Ditemukan",
          data: [],
        });
      }
    } else {
      await model.scrap
        .findAll({
          attributes: [
            "ItemId",
            "Email",
            "Title",
            "Desc",
            "Category",
            "Tools",
            "Steps",
            "Status",
          ],
        })
        .then((result) => {
          if (result.length > 0) {
            res.status(200).json({
              message: "Data Keseluruhan Scrap & Craft Ditemukan",
              data: result,
            });
          } else {
            res.status(200).json({
              message:
                "Data Keseluruhan Tidak Ditemukan, Silakan Mencoba lagi beberapa saat",
              data: [],
            });
          }
        });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

controller.getItemIdComp = async function (req, res) {
  try {
    let scrap = await model.scrap.findAll({
      where: {
        [Op.and]: [{ ItemId: req.query.ItemId }, { status: "Completed" }],
      },
    });

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Data Sesuai Item ID dan Completed Scrap & Craft Ditemukan",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message:
          "Data Tidak Ditemukan atau belum Completed, Silakan Mencoba lagi beberapa saat",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.getEmailComp = async function (req, res) {
  try {
    let scrap = await model.scrap.findAll({
      where: {
        [Op.and]: [{ Email: req.query.Email }, { status: "Completed" }],
      },
    });

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Data Sesuai Email dan Completed Scrap & Craft Ditemukan",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message:
          "Data Tidak Ditemukan atau Belum Completed, Silakan Mencoba lagi beberapa saat",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.getEmailUnComp = async function (req, res) {
  try {
    let scrap = await model.scrap.findAll({
      where: {
        [Op.and]: [{ Email: req.query.Email }, { Status: "Uncomplete" }],
      },
    });

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Data Sesuai Email dan Uncomplete Scrap & Craft Ditemukan",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message: "Data Tidak Ditemukan, Silakan Mencoba lagi beberapa saat",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.getOneTitle = async function (req, res) {
  try {
    let scrap = await model.scrap.findAll({
      where: {
        [Op.and]: [
          {
            Title: { [Op.like]: `%${req.query.Title}%` },
          },
          {
            status: "Completed",
          },
        ],
      },
    });

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Data Sesuai Title Scrap & Craft Ditemukan",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message:
          "Data Tidak Ditemukan atau belum Completed, Silakan Mencoba lagi beberapa saat",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.getOneCateg = async function (req, res) {
  try {
    let scrap = await model.scrap.findAll({
      where: {
        [Op.and]: [{ Category: req.query.Category }, { Status: "Completed" }],
      },
    });

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Data Sesuai Category Scrap & Craft Ditemukan",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message:
          "Data Keseluruhan Tidak Ditemukan atau belum Completed, Silakan Mencoba lagi beberapa saat",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.getLike = async function (req, res) {
  try {
    let scrap = await model.scrap.findAll({
      where: {
        [Op.and]: [
          {
            Tools: {
              [Op.like]: `%${req.query.Tools}%`,
            },
          },
          { status: "Completed" },
        ],
      },
    });

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Data Sesuai Like Scrap & Craft Ditemukan",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message:
          "Data Keseluruhan Tidak Ditemukan atau belum Completed, Silakan Mencoba lagi beberapa saat",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.post = async function (req, res) {
  try {
    let scrap = await model.scrap.create({
      ItemId: req.body.ItemId,
      Email: req.body.Email,
      Title: req.body.Title,
      Desc: req.body.Desc,
      Category: req.body.Category,
      Tools: req.body.Tools,
      Steps: req.body.Steps,
      Status: req.body.Status,
    });
    res.status(201).json({
      message: "Berhasil Menambahkan Data Scrap & Craft",
      data: scrap,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.put = async function (req, res) {
  try {
    let scrap = await model.scrap.update(
      {
        Email: req.body.Email,
        Title: req.body.Title,
        Desc: req.body.Desc,
        Category: req.body.Category,
        Tools: req.body.Tools,
        Steps: req.body.Steps,
        Status: req.body.Status,
      },
      {
        where: {
          ItemId: req.body.ItemId,
        },
      }
    );

    if (scrap.length > 0) {
      res.status(200).json({
        message: "Berhasil Mengubah Data Scrap & Craft",
      });
    } else {
      res.status(200).json({
        message: "Data Tidak Ditemukan, Silakan Mencoba lagi beberapa saat",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

controller.delete = async function (req, res) {
  try {
    let scrap = await model.scrap.destroy({
      where: {
        ItemId: req.query.ItemId,
      },
    });
    if (scrap) {
      res.status(200).json({
        message: "Data Berhasil Dihapus",
        data: scrap,
      });
    } else {
      res.status(200).json({
        message: "Data Tidak Ditemukan",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = controller;

