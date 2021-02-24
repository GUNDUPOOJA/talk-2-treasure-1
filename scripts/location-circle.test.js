import geolocation, {
  inside,
  isValidType,
  isValidLocation,
} from "./location-circle";
describe("inside", () => {
  it("returns false when device latitude is less than south bounding", () => {
    const device = {
      latitude: 5,
      longitude: 40,
    };
    const bounds = {
      South: 30,
      North: 20,
      East: 10,
      West: 5,
    };
    expect(inside(device, bounds)).toEqual(false);
  });
  it("returns false when device latitude is greater than north bounding", () => {
    const device = {
      latitude: 50,
      longitude: 40,
    };
    const bounds = {
      South: 30,
      North: 20,
      East: 10,
      West: 5,
    };
    expect(inside(device, bounds)).toEqual(false);
  });
  it("returns false when device longitude is greater than west bounding", () => {
    const device = {
      latitude: 15,
      longitude: 1,
    };
    const bounds = {
      South: 5,
      North: 20,
      East: 10,
      West: 5,
    };
    expect(inside(device, bounds)).toEqual(false);
  });
  it("returns false when device longitude is greater than east bounding", () => {
    const device = {
      latitude: 15,
      longitude: 15,
    };
    const bounds = {
      South: 5,
      North: 20,
      East: 10,
      West: 5,
    };
    expect(inside(device, bounds)).toEqual(false);
  });
  it("returns true when device latitude is  is greater than south and less than north bounding and when longitude is greater than west and less than east bounding", () => {
    const device = {
      latitude: 30,
      longitude: 15,
    };
    const bounds = {
      South: 5,
      North: 40,
      East: 20,
      West: 5,
    };
    expect(inside(device, bounds)).toEqual(true);
  });
});

describe("geolocation", () => {
  it("sets an error message when navigation.geolocation is not available", () => {
    document.body.innerHTML = `<div><span id="error-message" /></div>`;

    geolocation();
    expect(document.getElementById("error-message").innerHTML).toEqual(
      "Browser does not support geolocation."
    );
  });
  it("sets an error message when navigator.geolocation.getCurrentPosition doesnt return the position", () => {
    document.body.innerHTML = `
    <div><span id="error-message" /></div>
    <div><span id="device-lat" /></div>
    <div><span id="device-long" /></div>
    <div><span id="locationAnswer" /></div>
    `;
    navigator.geolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementationOnce((success) =>
          Promise.resolve(success(undefined))
        ),
    };
    geolocation();
    expect(document.getElementById("error-message").innerHTML).toEqual(
      "Browser cannot determine device position (position is undefined)."
    );
  });
  it("shows the latitude and longitude when navigator.geolocation.getCurrentPosition  returns the position", () => {
    document.body.innerHTML = `
    <div><span id="error-message" /></div>
    <div><span id="device-lat" /></div>
    <div><span id="device-long" /></div>
    <div><span id="locationAnswer" /></div>
    `;
    navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 10,
              longitude: 20,
            },
          })
        )
      ),
    };
    geolocation();
    expect(document.getElementById("device-lat").innerHTML).toEqual("10");
    expect(document.getElementById("device-long").innerHTML).toEqual("20");
  });
  //   it("shows the latitude and longitude when navigator.geolocation.getCurrentPosition  returns the position", () => {
  //     document.body.innerHTML = `
  //     <div><span id="error-message" /></div>
  //     <div><span id="device-lat" /></div>
  //     <div><span id="device-long" /></div>
  //     <div><span id="locationAnswer" /></div>
  //     `;
  //     navigator.geolocation = {
  //       getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
  //         Promise.resolve(
  //           success({
  //             coords: {
  //               latitude: 37,
  //               longitude: -92,
  //             },
  //           })
  //         )
  //       ),
  //     };
  //     const speechSynthesisUtteranceMock = jest.fn();
  //     const speakMock = jest.fn();
  //     global.SpeechSynthesisUtterance = speechSynthesisUtteranceMock.mockReturnValueOnce(
  //       {
  //         text: "",
  //         speak: speakMock,
  //       }
  //     );
  //     geolocation();
  //     expect(document.getElementById("device-lat").innerHTML).toEqual("37");
  //     expect(document.getElementById("device-long").innerHTML).toEqual("-92");
  //     expect(document.getElementById("locationAnswer").innerHTML).toEqual(
  //       "Horizons west apartments"
  //     );
  //     expect(speechSynthesisUtteranceMock).toHaveBeenCalledTimes(1);
  //     expect().toEqual(expect.stringContaining("Congratulations"));
  //   });

  it("shows the error message when navigator.geolocation.getCurrentPosition returns an error", () => {
    document.body.innerHTML = `
    <div><span id="error-message" /></div>
     <div><span id="device-lat" /></div>
    <div><span id="device-long" /></div>
    <div><span id="error-message" /></div>
    <div><span id="locationAnswer" /></div>
    `;
    navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success, error) =>
        Promise.resolve(
          error({
            code: 1,
            message: "GeoLocation Error",
          })
        )
      ),
    };
    geolocation();
    expect(document.getElementById("error-message").innerHTML).toEqual(
      "GeoLocation Error"
    );
  });
});

describe("isValidType", () => {
  it("throws an error if the location type is not circle", () => {
    try {
      const location = {
        type: "square",
      };
      isValidType(location);
    } catch (error) {
      expect(error).toEqual("Invalid Location Type");
    }
  });
  it("returns true if location type is circle", () => {
    const location = {
      type: "circle",
    };
    expect(isValidType(location)).toEqual(true);
  });
});

describe("isValidLocation", () => {
  it("throws an error when location name is absent", () => {
    const location = {
      name: [],
    };
    try {
      isValidLocation(location);
    } catch (error) {
      expect(error).toEqual("Invalid Location");
    }
  });
  it("throws an error when location type is not circle", () => {
    const location = {
      name: ["abc"],
      type: "square",
    };
    try {
      isValidLocation(location);
    } catch (error) {
      expect(error).toEqual("Invalid Location Type");
    }
  });
});
