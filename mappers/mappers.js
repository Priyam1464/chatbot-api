module.exports.MapApiDataToResponse = class Mappers {
  mapDataToJobOpenings(data) {
    console.log("d", data);
    let response = data.reduce((accum, curr) => {
      console.log("curr", curr);
      let result = "";
      for (let i = 0; i < curr.jobOpenings.length; i++) {
        console.log(curr.jobOpenings[i].description);
        result += `${i + 1}. ${curr.jobOpenings[i].description}\n`;
      }
      result += `For these openings reach out at Telegram Id ${curr.telegramId} with your resume`;
      return accum + result;
    }, "");

    return response;
  }

  mapDataToRecruiterJobOpenings(data) {
    let result = "These are your job openings\n";
    for (let i = 0; i < data.jobOpenings.length; i++) {
      console.log(data.jobOpenings[i].description);
      result += `${i + 1}. ${data.jobOpenings[i].description}\n`;
    }

    return result;
  }
};
