import ErrorPage from "@/components/show/ErrorPage";

const NotFound = () => {
  return (
    <ErrorPage
      title="页面未找到"
      message="您访问的页面不存在，可能已被移动或删除"
      showHomeButton={true}
      showRetryButton={false}
      showBackButton={true}
    />
  );
};

export default NotFound; 