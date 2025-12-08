"use client";

import Image from "next/image";
import { Button, ButtonGroup, FormSelect } from "react-bootstrap";

export default function Studio() {
  return (
    <div className="p-4" id="wd-studio-page">
      {/* Tabs */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <ButtonGroup>
            <Button variant="light" className="border-bottom-0 border">
              My Library
            </Button>
            <Button variant="light" className="border-0 border-top border-end">
              Settings
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <h2 className="mb-3">My Library</h2>

      <div className="mb-3" style={{ maxWidth: 260 }}>
        <div className="small fw-semibold mb-1">Sort Collections by</div>
        <FormSelect size="sm">
          <option>Date: Most recent on top</option>
        </FormSelect>
      </div>

      <div className="d-flex">
        {/* Left tree */}
        <div style={{ width: 260 }} className="me-3">
          <Button
            variant="primary"
            className="w-100 text-start d-flex align-items-center justify-content-between mb-2"
            size="sm"
          >
            <span>My Library</span>
            <span>+</span>
          </Button>
          <Button
            variant="light"
            className="w-100 text-start border-0 mb-1"
            size="sm"
          >
            Shared Library
          </Button>
          <Button
            variant="light"
            className="w-100 text-start border-0"
            size="sm"
          >
            Archive
          </Button>
        </div>

        {/* Main empty state */}
        <div className="flex-fill border d-flex flex-column align-items-center justify-content-center bg-white py-5">
          <div className="mb-3">
            <Image
              src="/Studio/nomedia.png"
              alt="No media"
              width={260}
              height={200}
            />
          </div>
          <h4 className="mb-1">Nothing here yet!</h4>
          <p className="text-muted mb-3">
            Add some videos to your collection.
          </p>
          <Button variant="primary" size="sm">
            + Add Videos
          </Button>
        </div>
      </div>
    </div>
  );
}
