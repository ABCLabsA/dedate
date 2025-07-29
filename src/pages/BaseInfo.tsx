import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getBaseInfoById } from "../api/base-info";
import { SparklesIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/solid";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";

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
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">加载中...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error || "项目不存在"}</p>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        返回
                    </button>
                </div>
            </div>
        );
    }

    const status = statusMap[project.status] || statusMap["pending"];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 返回按钮 */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    返回列表
                </button>

                {/* 项目详情卡片 */}
                <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 p-8">
                    {/* 头部信息 */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <SparklesIcon className="w-8 h-8 text-indigo-400 dark:text-indigo-300" />
                            <div>
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                    {project.name}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`inline-flex items-center justify-center gap-1 font-medium rounded-full ${status.bg} ${status.textColor} ${status.border}`}
                            style={{
                                minWidth: 80,
                                minHeight: 32,
                                fontSize: 14,
                                padding: "0 16px",
                                lineHeight: "28px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {status.icon}
                            {status.text}
                        </span>
                    </div>

                    {/* 展位信息 */}
                    {project.metadata?.booth && (
                        <div className="flex items-center gap-2 mb-6 p-4 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
                            <MapPinIcon className="w-5 h-5 text-pink-400" />
                            <span className="text-zinc-700 dark:text-zinc-200">
                                {project.metadata.booth}
                            </span>
                        </div>
                    )}

                    {/* 赛道标签 */}
                    {project.tracks && project.tracks.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                                参与赛道
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tracks.map((track: string, i: number) => (
                                    <span
                                        key={i}
                                        className="flex items-center gap-1 text-sm bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full"
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
                            <div className="text-zinc-700 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
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