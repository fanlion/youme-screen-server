/*
 * @Author: fan.li
 * @Date: 2019-01-07 14:20:42
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-07 14:56:22
 */

const express = require("express");
const YoumeServerSDK = require("../utils/YoumeServerSDK");

const router = express.Router();
const YoumeServerSDKInstance = YoumeServerSDK.getInstance();

/**
 * 获取推流地址
 */
router.get("/getPublishAddress/:userid", function(req, res, next) {
  const { userid } = req.params;
  if (!userid) {
    res.json({
      code: 1,
      msg: "params empty error",
      des: "userid cannot be empty"
    });
  }

  const params = {
    Hub: "youmetest",
    StreamKey: userid,
    Expire: 3600 * 4 // 地址有效期，单位为秒，demo设置为4小时
  };

  YoumeServerSDKInstance.sendPost("video", "get_rtmp_publish_url", params).then(data => {
    res.json({
      code: 0,
      msg: "ok",
      des: "ok",
      data: data
    });
  });
});

/**
 * 获取实时看地址
 */
router.get("/getLivePlayAddress/:userid", function(req, res, next) {
  const { userid } = req.params;
  if (!userid) {
    res.json({
      code: 1,
      msg: "params empty error",
      des: "userid cannot be empty"
    });
  }

  const params = {
    Hub: "youmetest",
    StreamKey: userid
  };

  YoumeServerSDKInstance.sendPost("video", "get_rtmp_play_url", params).then(data => {
    res.json({
      code: 0,
      msg: "ok",
      des: "ok",
      data: data
    });
  });
});

/**
 * 获取历史纪录
 */
router.get("/getPublishHistory/:userid/:starttime/:endtime", function(
  req,
  res,
  next
) {
  const { userid, starttime, endtime } = req.params;
  if (!userid || !starttime || !endtime) {
    res.json({
      code: 1,
      msg: "params empty error",
      des: "userid, starttime, endtime cannot be empty"
    });
  }

  const params = {
    Hub: "youmetest",
    StreamKey: userid,
    StartTimestamp: starttime,
    EndTimestamp: endtime
  };

  YoumeServerSDKInstance.sendPost("video", "get_history_activity", params).then(data => {
    res.json({
      code: 0,
      msg: "ok",
      des: "ok",
      data: data
    });
  });
});


/**
 * 获取会看地址
 */
router.get("/getPlaybackURL/:userid/:starttime/:endtime", function(req, res, next) {
  const { userid, starttime, endtime } = req.params;
  if (!userid || !starttime || !endtime) {
    res.json({
      code: 1,
      msg: "params empty error",
      des: "userid, starttime, endtime cannot be empty"
    });
  }

  const params = {
    Hub: "youmetest",
    StreamKey: userid,
    StartTimestamp: starttime,
    EndTimestamp: endtime
  };

  YoumeServerSDKInstance.sendPost("video", "save_play_back", params).then(data => {
    res.json({
      code: 0,
      msg: "ok",
      des: "ok",
      data: data,
    });
  });

});

module.exports = router;
