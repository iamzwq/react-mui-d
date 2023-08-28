import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRequest } from "ahooks";
import { usePreferenceStore, useSessionStore } from "~/stores";
import loginApi from "./api";

const Login: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const setSession = useSessionStore(state => state.setSession);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const { loading, run: onSubmit } = useRequest(loginApi.login, {
    manual: true,
    onSuccess: result => {
      const {
        data: { token, user },
        headers
      } = result;
      setSession({
        accessToken: token,
        name: user.name,
        email: user.email,
        username: user.username,
        userId: user.userId,
        acl: user.access_control_lists,
        serverVersion: headers.version,
        roles: user.roles,
        isClientFilter: user.is_client_filter,
        clients: user.clients,
        isTeamMember: user.is_team_member,
        releaseVersion: headers.release,
        isNew: user.isNew
      });
      setPreference(user.personalization);
      const redirect = searchParams.get("redirect");
      navigate(redirect || "/");
    }
  });

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (!isValid || loading) return;

    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1, my: "auto" }}>
          <Box sx={{ width: "60%", mx: "auto", mb: 4, fontSize: 28 }}>WELCOME TO</Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "60%",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="username"
                  variant="outlined"
                  autoComplete="off"
                  onKeyDown={handleKeydown}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="password"
                  variant="outlined"
                  type="password"
                  autoComplete="off"
                  onKeyDown={handleKeydown}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || loading}
              startIcon={
                loading ? (
                  <Box component="div" className="i-mdi-loading animate-spin" />
                ) : null
              }
              sx={{ height: 48 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "60vw",
            bgcolor: "primary.main",
            display: { xs: "none", md: "block" }
          }}
        />
      </Box>
    </>
  );
};

export default Login;
