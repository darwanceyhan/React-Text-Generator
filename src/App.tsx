import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useFetchParagraph from "./query/paragraph.query";

function App() {
  const [paragraphCount, setParagraphCount] = useState<number>(1);
  const [isHtmlFormat, setIsHtmlFormat] = useState<boolean>(false);

  const {
    isFetching,
    isSuccess,
    error,
    data: paragraphData,
    refetch,
  } = useFetchParagraph(paragraphCount);

  const handleCopy = () => {
    if (!isSuccess) return;
    if (isHtmlFormat) {
      navigator.clipboard.writeText(paragraphData);
    } else {
      const element = document.getElementById("text");
      const textToCopy = element?.textContent || "";
      navigator.clipboard.writeText(textToCopy);
    }
    window.alert("Copied");
  };

  return (
    <Grid container spacing={3} direction="row" sx={{ p: 4 }}>
      <Grid>
        <FormControl>
          <InputLabel htmlFor="paragraph-count">Paragraph Count</InputLabel>
          <Input
            id="paragraph-count"
            type="number"
            value={paragraphCount}
            onChange={(e) => setParagraphCount(Number(e.target.value))}
          />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl component="fieldset">
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={isHtmlFormat}
                  onChange={() => setIsHtmlFormat((prev) => !prev)}
                />
              }
              label="Output as HTML"
            />
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid>
        <Button variant="contained" onClick={() => refetch()}>
          Fetch Paragraphs
        </Button>
      </Grid>

      <Grid size={12} sx={{ mt: 4 }}>
        {isFetching && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: 200 }}
          >
            <CircularProgress />
          </Grid>
        )}
        {error && <Typography color="error">{error.message}</Typography>}
        {paragraphData && (
          <Paper elevation={3} sx={{ p: 3, backgroundColor: "#fafafa" }}>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleCopy}>
              Copy Paragraph
            </Button>
            {isHtmlFormat ? (
              <div id="html">{`${paragraphData}`}</div>
            ) : (
              <div
                id="text"
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
                dangerouslySetInnerHTML={{
                  __html: paragraphData,
                }}
              />
            )}
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
