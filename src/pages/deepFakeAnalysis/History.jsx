import { useContext, useEffect, useState } from "react";
import { Button, Image, Select, Tag } from "antd";
import { AppContext } from "../../context/AppContext";
import dayjs from "dayjs";
import Table from "../../components/Table";
import SearchInput from "../../components/ui/tableComponents/SearchInput";
import constants from "../../utils/constants";
import Icon from "../../components/AppIcon";

export default function History() {
  const contextValues = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const ShowDropdown = ({ className = "" }) => (
    <div className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
      <span className="text-sm text-gray-500">Show:</span>
      <Select
        className="!w-[70px]"
        onChange={(value) => setRowsPerPage(value)}
        value={rowsPerPage}
        options={[
          { label: "25", value: 25 },
          { label: "50", value: 50 },
          { label: "100", value: 100 },
        ]}
      />
    </div>
  );

  const columns = [
    {
      key: "image_name",
      label: "Image",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Image
            width={70}
            height={70}
            src={`${constants.api.getImages}/${item.image_name}`}
            alt={item.image_name}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <span className="text-gray-700 text-sm">{item.image_name}</span>
        </div>
      ),
    },
    {
      key: "prediction",
      label: "Result",
      render: (item) => (
        <span>
          {item.prediction === "fake" ? (
            <Tag color="red">Fake</Tag>
          ) : (
            <Tag color="green">Real</Tag>
          )}
        </span>
      ),
    },
    {
      key: "confidence",
      label: "Confidence Score",
      render: (item) => <span>{(item.confidence * 100).toFixed(2)}%</span>,
    },
    {
      key: "probs",
      label: "Probabilities",
      render: (item) => (
        <div className="flex flex-col gap-1">
          <Tag color="green">Real: {(item.probs.real * 100).toFixed(2)}%</Tag>
          <Tag color="red">
            Fake: {(item.probs.ai_generated * 100).toFixed(2)}%
          </Tag>
        </div>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      sortable: true,
      render: (item) => (
        <span>{dayjs(item.created_at).format("DD MMM, YYYY hh:mm A")}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <Button
          onClick={async () => {
            await contextValues.apiRequest({
              method: "DELETE",
              url: `${constants.api.deleteHistory}/${item.id}`,
              onSuccess: () => {
                getHistoryData();
              },
              onError: (err) => {
                console.log(err);
              },
            });
          }}
          icon={<Icon name="Trash2" size={16} />}
          className="flex justify-center items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        />
      ),
    },
  ];

  const getHistoryData = async () => {
    await contextValues.apiRequest({
      url: `${constants.api.history}?page=${page}&limit=${rowsPerPage}&search=${search}`,
      onSuccess: (res) => {
        setData(res.data);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getHistoryData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getHistoryData();
  }, [page, rowsPerPage]);

  useEffect(() => {
    contextValues.setStore({
      headerData: {
        title: `Deep Fake Analysis History`,
        icon: "History",
      },
    });
    getHistoryData();
  }, []);

  return (
    <div className="bg-background">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-4 p-4">
            <div className="lg:flex-1 w-full">
              <SearchInput
                placeholder="Search Images"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ShowDropdown />
          </div>
          <Table
            columns={columns}
            data={data.results || []}
            page={page}
            pageSize={rowsPerPage}
            total={data.total || 0}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
