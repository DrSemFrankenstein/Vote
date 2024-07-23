import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Vote from "./Components/Vote";
import Rating from "./Components/Rating";
import { Footer } from "antd/es/layout/layout";
import { Divider, Image, Modal, Typography } from "antd";
import {
  InfoCircleOutlined,
  SettingOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { useDispatch } from "react-redux";
import { setInitialData } from "./app/actions";

function App() {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const dataRef = useRef(data);

  // Update the ref whenever data changes
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const info = () => {
    Modal.info({
      title: "About this app",
      centered: true,
      width: 1000,
      content: (
        <div>
          <p>This is a standalone voting app for comparing photos.</p>
          <p>
            It displays two random photos from a list, allowing users to click
            on their preferred choice.
          </p>
          <p>
            When a user selects a photo, the component updates the ratings of
            the photos based on user preferences.
          </p>
          <Divider />
          <p>
            The rating system used in this app is based on the ELO rating
            system. Here’s a brief overview of how it works:
          </p>
          <p>
            <strong>Initial Rating:</strong> Each photo starts with a certain
            initial rating, typically set at 1000.
          </p>
          <p>
            <strong>Expected Outcome:</strong> The expected outcome of a match
            between two photos is calculated based on their current ratings
            using the formula:
            <br />
            <code>
              E<sub>A</sub> = 1 / (1 + 10
              <sup>
                (R<sub>B</sub> - R<sub>A</sub>) / 400
              </sup>
              )
            </code>
            <br />
            where:
            <ul>
              <li>
                <code>
                  E<sub>A</sub>
                </code>{" "}
                — the expected score for photo A,
              </li>
              <li>
                <code>
                  R<sub>A</sub>
                </code>{" "}
                and{" "}
                <code>
                  R<sub>B</sub>
                </code>{" "}
                — the current ratings of photos A and B, respectively.
              </li>
            </ul>
          </p>
          <p>
            <strong>Actual Outcome:</strong> The result of the match can be 1
            (win), 0.5 (draw), or 0 (loss).
          </p>
          <p>
            <strong>Rating Update:</strong> Ratings are updated based on the
            actual and expected outcomes using the formula:
            <br />
            <code>
              R<sub>new</sub> = R<sub>old</sub> + K * (W - E)
            </code>
            <br />
            where:
            <ul>
              <li>
                <code>
                  R<sub>new</sub>
                </code>{" "}
                — the new rating,
              </li>
              <li>
                <code>
                  R<sub>old</sub>
                </code>{" "}
                — the old rating,
              </li>
              <li>
                <code>K</code> — the coefficient (typically 32 for beginners and
                16 for professionals),
              </li>
              <li>
                <code>W</code> — the actual result (1, 0.5, or 0),
              </li>
              <li>
                <code>E</code> — the expected result.
              </li>
            </ul>
          </p>
          <p>
            <strong>Example Calculation:</strong> For instance, if photo A has a
            rating of 1600 and photo B has a rating of 1400, and photo A wins:
            <br />
            Expected result for A:
            <code>
              E<sub>A</sub> = 1 / (1 + 10<sup>(1400 - 1600) / 400</sup>) ≈ 0.76
            </code>
            <br />
            Expected result for B:
            <code>
              E<sub>B</sub> = 1 / (1 + 10<sup>(1600 - 1400) / 400</sup>) ≈ 0.24
            </code>
            <br />
            Updated ratings:
            <code>
              R<sub>A</sub> = 1600 + 32 * (1 - 0.76) ≈ 1608
            </code>
            <br />
            <code>
              R<sub>B</sub> = 1400 + 32 * (0 - 0.24) ≈ 1392
            </code>
            <br />
            Thus, after the match, photo A’s rating increases to 1608, while
            photo B’s rating decreases to 1392.
          </p>
          <Image
            src="https://www.henrychesssets.com/wp-content/uploads/elo-rating-algorithm.png"
            alt="Elo Rating System"
            width={"90%"}
          />
          <br />
          <br />
          <Divider />
          <p>
            The images taked from{" "}
            <a href="https://www.uifaces.co/">https://www.uifaces.co/</a>{" "}
            website
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleFileChange = (info) => {
    const file = info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonString = e.target.result;
        console.log(jsonString);
        setData(JSON.parse(jsonString));
      };
      reader.readAsText(file);
    }
  };

  const draggerProps = {
    name: "file",
    accept: ".json",
    beforeUpload: () => false,
    onChange: handleFileChange,
    multiple: false,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const settings = () => {
    Modal.confirm({
      title: "Settings",
      centered: true,
      width: 1000,
      content: (
        <div>
          <p>Setup your data to vote</p>
          <p>
            <strong>JSON Format Example:</strong>
            <pre>
              <code>
                {`[
  {
    "id": 1,
    "fullName": "Melissa Reichert",
    "score": 1000,
    "img": "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
  },
  ...
]`}
              </code>
            </pre>
          </p>
          <div style={{ margin: "16px 0" }}>
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
        </div>
      ),
      onOk() {
        dataRef.current && dispatch(setInitialData(dataRef.current));
      },
    });
  };

  return (
    <Router>
      <div id="root">
        <header>
          <nav>
            <ul>
              <li>
                <SettingOutlined
                  className="settings-icon"
                  onClick={() => settings()}
                />
              </li>
              <li>
                <Link to="/Vote/">VOTE</Link>
              </li>
              <li>
                <Link to="/rating">RATING</Link>
              </li>
              <li>
                <InfoCircleOutlined
                  className="info-icon"
                  onClick={() => info()}
                />
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/Vote" element={<Vote />} />
            <Route path="/rating" element={<Rating />} />
          </Routes>
        </main>
        <footer>
          <Text level={6} style={{ color: "white" }}>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/simon-p-68016224/"
              style={{ textDecoration: "underline" }}
            >
              Simon{" "}
            </a>
            {new Date().getFullYear()}©
          </Text>
        </footer>
      </div>
    </Router>
  );
}

export default App;
