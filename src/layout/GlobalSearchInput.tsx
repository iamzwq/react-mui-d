import { FC, useState } from "react";
import { Box, IconButton, Input } from "@mui/material";
import { useGlobalStore } from "~/stores";
import useHomeStore from "~/pages/Home/store";

const GlobalSearchInput: FC = () => {
  const setGlobalSearchText = useGlobalStore(state => state.setSearchText);
  const setCurrFilter = useHomeStore(state => state.setCurrFilter);

  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      {!searchInputVisible && (
        <IconButton
          onClick={() => {
            setSearchInputVisible(!searchInputVisible);
          }}
        >
          <Box className="i-mdi-magnify" />
        </IconButton>
      )}
      {searchInputVisible && (
        <Input
          type="text"
          size="small"
          autoFocus
          onBlur={() => {
            setSearchInputVisible(searchText.length > 0);
          }}
          onChange={e => {
            setSearchText(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              setGlobalSearchText((e.target as HTMLInputElement).value);
              setCurrFilter(null);
            }
          }}
          inputProps={{ sx: { pb: 0 } }}
        />
      )}
    </>
  );
};

export default GlobalSearchInput;
