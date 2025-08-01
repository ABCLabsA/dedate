import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getBaseInfoById } from "@/api/base-info";
import { SparklesIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/solid";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import ErrorPage from "@/components/show/ErrorPage";
import LoadingPage from "@/components/show/LoadingPage";

const statusMap: Record<
  string,
  {
    text: string;
    icon: React.ReactNode;
    bg: string;
    textColor: string;
    border: string;
  }
> = {
  submiited: {
    text: "已提交",
    icon: <FaRegCheckCircle className="w-3.5 h-3.5" />,
    bg: "bg-green-50 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
    border: "border border-green-200 dark:border-green-700",
  },
  pending: {
    text: "待提交",
    icon: <FaRegClock className="w-3.5 h-3.5" />,
    bg: "bg-yellow-50 dark:bg-yellow-900",
    textColor: "text-yellow-700 dark:text-yellow-300",
    border: "border border-yellow-200 dark:border-green-700",
  },
};

const BaseInfoProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectDetail = async () => {
            if (!id) {
                setError("项目ID不存在");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await getBaseInfoById(id);
                setProject(response.data);
                setError(null);
            } catch (err) {
                console.error("获取项目详情失败:", err);
                setError("获取项目详情失败");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetail();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <LoadingPage
                title="加载项目详情"
                message="正在为您加载项目信息，请稍候"
                showSpinner={true}
                showSparkles={false}
            />
        );
    }

    if (error || !project) {
        return (
            <ErrorPage
                title={error ? "获取项目失败" : "项目不存在"}
                message={error || "您要查看的项目不存在或已被删除"}
                showHomeButton={true}
                showRetryButton={true}
                showBackButton={true}
                onRetry={() => window.location.reload()}
                onBack={() => navigate(-1)}
            />
        );
    }

    const status = statusMap[project.status] || statusMap["pending"];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 返回按钮 */}
                <button
                    onClick={handleBack}
                    className="cursor-pointer flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    返回列表
                </button>

                {/* 项目详情卡片 */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                    {/* 头部信息 */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <SparklesIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white leading-tight">
                                    {project.name}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${status.bg} ${status.textColor} ${status.border} flex-shrink-0`}
                        >
                            {status.icon}
                            {status.text}
                        </span>
                    </div>

                    {/* 展位信息 */}
                    {project.metadata?.booth && (
                        <div className="flex items-center gap-3 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                                <MapPinIcon className="w-4 h-4 text-pink-500" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">展位信息</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {project.metadata.booth}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 赛道标签 */}
                    {project.tracks && project.tracks.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                                参与赛道
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tracks.map((track: string, i: number) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700"
                                    >
                                        <TagIcon className="w-4 h-4 text-indigo-400" />
                                        {track}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 详细描述 */}
                    {project.detailedDescription && (
                        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                                项目详情
                            </h3>
                            <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                                {project.detailedDescription}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BaseInfoProject;