FROM node:16
WORKDIR /usr/src/app

ARG BRANCH
ARG git_username
ARG git_access_token
ARG git_commit

# 改变项目version的环境变量为提交的git commit
ENV VITE_APP_VERSION ${git_commit}

RUN git clone http://${git_username}:${git_access_token}@odsgitlab1.odsdai.netdai.com/enterprise-dashboard/enterprise_dashboard_ui.git /usr/src/app
RUN git checkout -f ${git_commit}

# 在克隆后更改工作目录以防止非空目录出错
WORKDIR /usr/src/app
RUN yarn --frozen-lockfile && npm run build-${BRANCH}


FROM nginx
RUN mkdir /usr/src/app
COPY --from=0 /usr/src/app/dist /usr/src/app
COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /usr/src/app/env_create.sh /usr/src/env_create.sh

# 在容器内部显式暴露端口80
EXPOSE 80
CMD ["/bin/sh"]