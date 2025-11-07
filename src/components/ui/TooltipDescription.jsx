import React, { useState } from "react";
import { Modal, Popover } from "antd";
import DOMPurify from "dompurify";

const TooltipDescription = ({ html }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cleanHTML = DOMPurify.sanitize(html || "");

    const popoverContent = (
        <div
            className="max-w-sm max-h-60 overflow-auto whitespace-pre-wrap text-sm text-black"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    );

    return (
        <>
            <Popover
                content={popoverContent}
                trigger="hover"
                placement="topLeft"
                overlayClassName="z-50"
            >
                <div
                    className="line-clamp-2 cursor-pointer w-60 text-sm text-gray-800 overflow-hidden whitespace-pre-wrap"
                    onClick={() => setIsModalOpen(true)}
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                />
            </Popover>

            <Modal
                open={isModalOpen}
                title="Full Description"
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
                bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
            >
                <div
                    className="whitespace-pre-wrap text-sm text-gray-900"
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                />
            </Modal>
        </>
    );
};

export default TooltipDescription;
