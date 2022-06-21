import React from "react";
import Layout from "../NewLayout";
import "./main.css";
import "./shipment_tracking.css";
import { initializeJourneySharing } from "./shipment_tracking";
import { ShipmentTrackingOptionsModal } from "./options.js";

export const NewTrack = () => {
  //let ob = new initializeJourneySharing();
  const optionsModal = new ShipmentTrackingOptionsModal("options-container");

  class ShipmentTrackingApp {
    /**
     * @param {!ShipmentTrackingOptionsModal} optionsModal
     */
    constructor(optionsModal) {
      this.isLoadingResults_ = false;

      this.trackingId_ = optionsModal.options.trackingId;
      this.optionsModal = optionsModal;
    }

    /**
     * Creates the singleton app instance
     *
     * @param {?ShipmentTrackingOptionsModal} optionsModal
     * @return {!ShipmentTrackingApp}
     */
    static createInstance(optionsModal) {
      this.instance = new ShipmentTrackingApp(optionsModal || {});
      return this.instance;
    }

    /**
     * Returns or creates the singleton app instance
     * @return {!ShipmentTrackingApp}
     */
    static getInstance() {
      if (!this.instance) {
        return ShipmentTrackingApp.createInstance();
      }

      return this.instance;
    }

    /**
     * Returns the tracking ID
     * @return {string} Tracking ID
     */
    get trackingId() {
      return this.trackingId_;
    }

    /**
     * Sets the tracking ID
     */
    set trackingId(newTrackingId) {
      if (this.trackingId_ === newTrackingId) {
        return;
      }

      this.resetShipmentDetailsDisplay();
      this.isLoadingResults = !!newTrackingId;

      this.trackingId_ = newTrackingId;
      this.locationProvider.trackingId = newTrackingId;
    }

    /**
     * Disables inputs and shows a loading message depending on the value of
     * `newIsLoadingResults`
     */
    set isLoadingResults(newIsLoadingResults) {
      if (this.isLoadingResults_ === newIsLoadingResults) {
        return;
      }

      this.isLoadingResults_ = newIsLoadingResults;
      setInputsDisabled(newIsLoadingResults);
      showHideElementById("loading", newIsLoadingResults);
    }

    /**
     * Creates a FleetEngineLocationProvider and JourneySharingMapView. Also
     * sets LocationProvider event listeners.
     */
    start() {
      this.locationProvider =
        new window.google.maps.journeySharing.FleetEngineShipmentLocationProvider(
          {
            projectId: "micro-enigma-344906",
            authTokenFetcher: this.authTokenFetcher,
            trackingId: this.trackingId_,
            pollingIntervalMillis:
              this.optionsModal.options.pollingIntervalMillis,
          }
        );

      console.log(
        new window.google.maps.journeySharing.FleetEngineShipmentLocationProvider(
          {
            projectId: "micro-enigma-344906",
            authTokenFetcher: this.authTokenFetcher,
            trackingId: this.trackingId_,
            pollingIntervalMillis:
              this.optionsModal.options.pollingIntervalMillis,
          }
        )
      );

      const mapViewOptions = {
        element: document.getElementById("map_canvas"),
        locationProvider: this.locationProvider,
        anticipatedRoutePolylineSetup: {
          visible: this.optionsModal.options.showAnticipatedRoutePolyline,
        },
        takenRoutePolylineSetup: {
          visible: this.optionsModal.options.showTakenRoutePolyline,
        },
      };

      if (this.optionsModal.options.vehicleIcon !== "defaultVehicleIcon") {
        mapViewOptions.vehicleMarkerSetup = this.optionsModal.getMarkerSetup(
          this.optionsModal.options.vehicleIcon
        );
      }

      if (
        this.optionsModal.options.destinationIcon !== "defaultDestinationIcon"
      ) {
        mapViewOptions.destinationMarkerSetup =
          this.optionsModal.getMarkerSetup(
            this.optionsModal.options.destinationIcon
          );
      }

      this.mapView =
        new window.google.maps.journeySharing.JourneySharingMapView(
          mapViewOptions
        );

      this.mapView.map.setOptions({
        center: { lat: 37.424069, lng: -122.0916944 },
        zoom: 14,
      });

      window.google.maps.event.addListenerOnce(
        this.mapView.map,
        "tilesloaded",
        () => {
          setInputsDisabled(false);
        }
      );

      this.locationProvider.addListener("update", (e) => {
        const task = e.task;
        console.log(task);
        this.isLoadingResults = false;

        if (!task) {
          return;
        }

        if (!task.hasOwnProperty("status")) {
          document.getElementById(
            "tracking-id-error"
          ).textContent = `No shipment found for tracking id '${this.trackingId_}'`;
          showHideElementById("tracking-id-error", true);
          return;
        }

        document.getElementById("details-container").style.display = "block";

        // Tracking ID
        document.getElementById("tracking-id-value").textContent =
          this.trackingId_;

        // Task type
        document.getElementById("task-type-value").textContent = task.type;

        // Task status
        document.getElementById("task-status-value").textContent = task.status;

        // Task outcome
        document.getElementById("task-outcome-value").textContent =
          task.outcome;

        // # stops remaining
        const showStopsRemaining = !!task.remainingVehicleJourneySegments;
        const remainingVehicleJourneySegments =
          task.remainingVehicleJourneySegments || [];
        const stopsRemaining = showStopsRemaining
          ? remainingVehicleJourneySegments.length
          : -1;
        if (showStopsRemaining) {
          document.getElementById("stops-remaining-value").textContent =
            stopsRemaining;
          if (stopsRemaining >= 2) {
            document.getElementById(
              "stops-count"
            ).innerText = `${stopsRemaining} stops away`;
          } else if (stopsRemaining === 1) {
            document.getElementById("stops-remaining-value").textContent = "";
            if (task.outcome === "SUCCEEDED") {
              document.getElementById("stops-count").innerText = "Completed";
            } else if (task.outcome === "FAILED") {
              document.getElementById("stops-count").innerText = "Attempted";
            } else {
              document.getElementById(
                "stops-count"
              ).innerText = `You are the next stop`;
            }
          }
        } else {
          document.getElementById("stops-remaining-value").textContent = "";
          if (task.status === "CLOSED") {
            document.getElementById("stops-remaining-value").textContent = "";
            if (task.outcome === "SUCCEEDED") {
              document.getElementById("stops-count").innerText = "Completed";
            } else {
              document.getElementById("stops-count").innerText = "Attempted";
            }
          } else {
            document.getElementById("stops-count").innerText = "";
          }
        }

        // ETA
        document.getElementById("eta-value").textContent =
          task.estimatedCompletionTime;

        // Fetch data from manifest
        const taskId = task.name.split("/").pop();
        fetch(`/task/${taskId}?manifestDataRequested=true`)
          .then((response) => response.json())
          .then((d) => {
            if (d == null || d["status"] === 404) {
              document.getElementById("eta-time").innerText = "n/a";
              document.getElementById("address").innerText = "n/a";
              return;
            }
            if (d["planned_completion_time"] != "") {
              const completionTime = new Date(d["planned_completion_time"]);
              let timeString = getTimeString(completionTime);
              if (d["planned_completion_time_range_seconds"] > 0) {
                timeString =
                  timeString +
                  " - " +
                  getTimeString(
                    new Date(
                      completionTime.getTime() +
                        d["planned_completion_time_range_seconds"] * 1000
                    )
                  );
              }
              document.getElementById("eta-time").innerText = timeString;
            } else {
              document.getElementById("eta-time").innerText = "n/a";
            }
            if (d["planned_waypoint"]["description"] != null) {
              document.getElementById("address").innerText =
                d["planned_waypoint"]["description"];
            } else {
              document.getElementById("address").innerText = "n/a";
            }
          });
      });

      this.locationProvider.addListener("error", (e) => {
        console.error(e);
        const error = e.error;

        this.isLoadingResults = false;

        document.getElementById(
          "tracking-id-error"
        ).textContent = `Error: ${error.message}`;
        showHideElementById("tracking-id-error", true);
      });
    }

    /**
     * Resets DOM elements and restarts the shipment tracking demo app.
     */
    restart() {
      setInputsDisabled(true);
      this.resetErrorDisplay();
      this.resetShipmentDetailsDisplay();
      this.start();
    }

    /**
     * Resets the DOM elements that display shipment details.
     */
    resetShipmentDetailsDisplay() {
      this.resetErrorDisplay();

      document.getElementById("tracking-id-value").textContent = "";
      document.getElementById("task-type-value").textContent = "";
      document.getElementById("task-status-value").textContent = "";
      document.getElementById("task-outcome-value").textContent = "";
      document.getElementById("stops-remaining-value").textContent = "";
      document.getElementById("eta-value").textContent = "";
    }

    /**
     * Resets the error message display
     */
    resetErrorDisplay() {
      document.getElementById("tracking-id-error").textContent = "";
      showHideElementById("tracking-id-error", false);
    }

    /**
     * Fetcher to get auth tokens from backend.
     */
    async authTokenFetcher(options) {
      const url = `${"BACKEND_HOST"}/token/delivery_consumer/${
        options.context.trackingId
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const expiresInSeconds = Math.floor(
        (data.expiration_timestamp_ms - Date.now()) / 1000
      );
      if (expiresInSeconds < 0) {
        throw new Error("Auth token already expired");
      }
      return {
        token: data.token,
        expiresInSeconds: data.expiration_timestamp_ms - Date.now(),
      };
    }
  }

  const app = ShipmentTrackingApp.createInstance(optionsModal);

  const startTracking = debounce((e) => {
    const trackingId = document.getElementById("tracking-id-input").value;
    if (trackingId !== app.trackingId) {
      optionsModal.options.trackingId = trackingId;
      optionsModal.saveToHistory();
      app.trackingId = trackingId;
    }
    e.preventDefault();
  }, 500);

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const callNow = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => (timeout = null), wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function setInputsDisabled(disabled) {
    if (disabled) {
      document
        .getElementById("tracking-id-input")
        .setAttribute("disabled", true);
      document.getElementById("tracking-button").setAttribute("disabled", true);
    } else {
      document.getElementById("tracking-id-input").removeAttribute("disabled");
      document.getElementById("tracking-button").removeAttribute("disabled");
    }
  }

  function showHideElementById(id, show) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = show ? "block" : "none";
    }
  }

  function getTimeString(date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <Layout sidebar>
      <div>
        {/* header bar */}
        <header
          className="mdc-top-app-bar mdc-top-app-bar--fixed mdc-elevation--z3 mdc-theme--surface"
          style={{
            backgroundColor: "white !important",
            color: "#3c4043 !important",
          }}
        >
          <div>
            <link rel="stylesheet" href="./main.css" />
            <link rel="stylesheet" href="./shipment_tracking.css" />
          </div>

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Material+Icons"
          />

          <link
            rel="stylesheet"
            href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
          />
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button
                id="menu-button"
                className="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon mdc-theme--on-surface"
              >
                <div className="mdc-icon-button__ripple" />
                menu
              </button>
              <span
                className="mdc-top-app-bar__title"
                style={{
                  fontFamily: '"Google Sans", "Roboto", sans-serif !important',
                  fontWeight: 400,
                }}
              >
                Shipment Tracking
              </span>
            </section>
          </div>
        </header>
        {/* menu */}
        <aside className="mdc-drawer mdc-drawer--modal">
          <div className="mdc-drawer__header mdc-elevation--z2">
            <h3
              className="mdc-drawer__title"
              style={{
                fontFamily: '"Google Sans", "Roboto", sans-serif !important',
                fontWeight: 400,
                marginTop: "0.25rem",
              }}
            >
              Shipment Tracking
            </h3>
          </div>
          <div className=" mdc-drawer__content">
            <nav className="mdc-deprecated-list">
              <a
                className="mdc-deprecated-list-item"
                href="#"
                aria-current="page"
                tabIndex={0}
                id="show-options-button"
              >
                <span className="mdc-deprecated-list-item__ripple" />
                <i
                  className="material-icons mdc-deprecated-list-item__graphic"
                  aria-hidden="true"
                >
                  settings
                </i>
                <span className="mdc-deprecated-list-item__text">Options</span>
              </a>
              <a
                className="mdc-deprecated-list-item"
                href="#"
                aria-current="page"
                tabIndex={0}
                id="reset-button"
              >
                <span className="mdc-deprecated-list-item__ripple" />
                <i
                  className="material-icons mdc-deprecated-list-item__graphic"
                  aria-hidden="true"
                >
                  restart_alt
                </i>
                <span className="mdc-deprecated-list-item__text">Reset</span>
              </a>
            </nav>
          </div>
        </aside>
        <div className="mdc-drawer-scrim" />
        <main
          className="mdc-top-app-bar--fixed-adjust"
          style={{ height: "100%" }}
        >
          <div id="options-container" />
          <div className="grid">
            <div className="grid__col grid__col--info">
              <div className="input-container">
                <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon">
                  <input
                    className="mdc-text-field__input"
                    id="tracking-id-input"
                  />
                  <div className="mdc-notched-outline">
                    <div className="mdc-notched-outline__leading" />
                    <div className="mdc-notched-outline__notch">
                      <label
                        htmlFor="tracking-id-input"
                        className="mdc-floating-label"
                      >
                        Tracking ID
                      </label>
                    </div>
                    <div className="mdc-notched-outline__trailing" />
                  </div>
                  <i
                    className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
                    id="tracking-button"
                    tabIndex={0}
                    role="button"
                    onClick={startTracking}
                  >
                    forward
                  </i>
                </div>
              </div>
              <div id="tracking-id-error" />
              <div
                className="details-container"
                id="details-container"
                style={{ display: "none" }}
              >
                <div id="loading">Loading...</div>
                <div className="info-container">
                  <div className="heading">ESTIMATED DELIVERY</div>
                  <div className="eta-time" id="eta-time">
                    n/a
                  </div>
                  <div className="stops-count" id="stops-count">
                    1 stop away
                  </div>
                  <div className="heading" style={{ marginTop: 32 }}>
                    DELIVERY LOCATION
                  </div>
                  <div className="address" id="address">
                    n/a
                  </div>
                </div>
                <table
                  className="shipment-details-table"
                  style={{ marginTop: 32 }}
                >
                  <tbody>
                    <tr>
                      <td className="shipment-details-table__label">
                        Tracking ID
                      </td>
                      <td
                        className="shipment-details-table__value"
                        id="tracking-id-value"
                      />
                    </tr>
                    <tr>
                      <td className="shipment-details-table__label">
                        Task type
                      </td>
                      <td
                        className="shipment-details-table__value"
                        id="task-type-value"
                      />
                    </tr>
                    <tr>
                      <td className="shipment-details-table__label">
                        Task status
                      </td>
                      <td
                        className="shipment-details-table__value"
                        id="task-status-value"
                      />
                    </tr>
                    <tr>
                      <td className="shipment-details-table__label">
                        Task outcome
                      </td>
                      <td
                        className="shipment-details-table__value"
                        id="task-outcome-value"
                      />
                    </tr>
                    <tr>
                      <td className="shipment-details-table__label">
                        # stops remaining
                      </td>
                      <td
                        className="shipment-details-table__value"
                        id="stops-remaining-value"
                      />
                    </tr>
                    <tr>
                      <td className="shipment-details-table__label">ETA</td>
                      <td
                        className="shipment-details-table__value"
                        id="eta-value"
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid__col grid__col--map">
              <div id="map_canvas" />
            </div>
          </div>
        </main>
        <script src="options.js" defer></script>
        <script src="shipment_tracking.js" defer></script>
        <script src="config.js"></script>
      </div>
    </Layout>
  );
};
