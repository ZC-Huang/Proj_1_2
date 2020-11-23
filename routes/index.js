const express = require("express");
const router = express.Router();

const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/index");
});

router.get("/index", async (req, res) => {
  const page = req.query.page || 1;
  console.log("/index", page);

  try {
    const tenants = await myDB.getTenant(page);
    const amenityReservations = await myDB.getAmenity(page);
    res.render("index", {
      tenants: tenants,
      amenityReservations: amenityReservations,
      err: req.session.err,
      msg: req.session.msg,
    });
  } catch (err) {
    console.log("got error", err);
    res.render("index", { err: err.message, tenants: [] });
  }
});


router.post("/index/tdelete", async (req, res) => {
  try {
    const tenant = req.body;
    const { lastID, changes } = await myDB.deleteTenant(tenant);

    console.log(lastID, changes);
    if (changes === 0) {
      req.session.err = `Couldn't delete the object ${tenant.tenantID}`;
      res.redirect("/index");
      return;
    }

    req.session.msg = "Tenant Deleted";
    res.redirect("/index");
    return;
  } catch (err) {
    console.log("got error delete");
    req.session.err = err.message;
    res.redirect("/index");
    return;
  }
});

router.post("/index/tupdate", async (req, res) => {
  try {
    const tenant = req.body;
    const result = await myDB.updateTenant(tenant);

    if (result.result.ok) {
      req.session.msg = "Tenant Updated";
      res.redirect("/index");
      return;
    } else {
      req.session.err = "Error updating";
      res.redirect("/index");
    }
  } catch (err) {
    console.log("got error update", err);
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/tcreate", async (req, res) => {
  const tenant = req.body;

  try {
    console.log("Create tenant", tenant);
    await myDB.createTenant(tenant, res);
    req.session.msg = "Tenant Created";
    res.redirect("/index");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/index");
  }
});


router.post("/index/rdelete", async (req, res) => {
  try {
    const amenityReservation = req.body;
    const { lastID, changes } = await myDB.deleteReservation(amenityReservation);

    console.log(lastID, changes);
    if (changes === 0) {
      req.session.err = `Couldn't delete the object ${amenityReservation.reservationID}`;
      res.redirect("/index");
      return;
    }

    req.session.msg = "Reservation Deleted";
    res.redirect("/index");
    return;
  } catch (err) {
    console.log("got error delete");
    req.session.err = err.message;
    res.redirect("/index");
    return;
  }
});

router.post("/index/rupdate", async (req, res) => {
  try {
    const amenityReservation = req.body;
    const result = await myDB.updateReservation(amenityReservation);

    if (result.result.ok) {
      req.session.msg = "Reservation Updated";
      res.redirect("/index");
      return;
    } else {
      req.session.err = "Error updating";
      res.redirect("/index");
    }
  } catch (err) {
    console.log("got error update", err);
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/rcreate", async (req, res) => {
  const amenityReservation = req.body;

  try {
    console.log("Create reservation", amenityReservation);
    await myDB.createReservation(amenityReservation, res);
    req.session.msg = "Reservation Created";
    res.redirect("/index");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/index");
  }
});

module.exports = router;
