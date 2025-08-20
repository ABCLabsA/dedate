import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getBaseInfoById } from "@/api/base-info";
import { SparklesIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/solid";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import ErrorPage from "@/components/show/ErrorPage";
import LoadingPage from "@/components/show/LoadingPage";
import CommentSection from "@/components/comment/CommentSection";
import { getCommentUserInfo, type CommentUserInfoResponse } from "@/api/auth";
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
    const [isExpanded, setIsExpanded] = useState(false);
    const [userInfo, setUserInfo] = useState<CommentUserInfoResponse | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getCommentUserInfo();
            setUserInfo(response as any);
        };

        fetchUserInfo();
    }, []);


    useEffect(() => {
        console.log(id);
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
        <motion.div 
            className="min-h-screen "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 返回按钮 */}
                <motion.button
                    onClick={handleBack}
                    className="cursor-pointer flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    返回列表
                </motion.button>

                {/* 项目详情卡片 */}
                <motion.div 
                    className="rounded-xl p-4 sm:p-6 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-white/50 dark:border-zinc-700/50 shadow-sm"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* 头部信息 */}
                    <motion.div 
                        className="flex items-start justify-between mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="flex items-start gap-3 sm:gap-4">
                            <motion.div 
                                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                            >
                                <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                                <motion.h1 
                                    className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white leading-tight"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    {project.name}
                                </motion.h1>
                                <motion.p 
                                    className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed text-sm sm:text-base"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    {project.description}
                                </motion.p>
                            </div>
                        </div>
                        <motion.span
                            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${status.bg} ${status.textColor} ${status.border} flex-shrink-0`}
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                        >
                            {status.icon}
                            {status.text}
                        </motion.span>
                    </motion.div>

                    {/* 展位信息 */}
                    {project.metadata?.booth && (
                        <motion.div 
                            className="flex items-center gap-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-lg border border-white/40 dark:border-zinc-700/40"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                                <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">展位信息</div>
                                <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                    {project.metadata.booth}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* 赛道标签 */}
                    {project.tracks && project.tracks.length > 0 && (
                        <motion.div 
                            className="mb-4 sm:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-3 sm:mb-4">
                                参与赛道
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tracks.map((track: string, i: number) => (
                                    <motion.span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-white/40 dark:border-zinc-700/40"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                                    >
                                        <TagIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                                        {track}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 详细描述 */}
                    {project.detailedDescription && (
                        <motion.div 
                            className="border-t border-zinc-200/50 dark:border-zinc-700/50 pt-4 sm:pt-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <div className="mb-3 sm:mb-4">
                                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">
                                    项目详情
                                </h3>
                            </div>
                            
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div 
                                        className="text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/40 dark:border-zinc-700/40 prose prose-zinc dark:prose-invert max-w-none mb-4"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({children}) => <h1 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3 pb-2 border-b border-zinc-200 dark:border-zinc-700">{children}</h1>,
                                                h2: ({children}) => <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 mt-4 pb-2 border-b border-zinc-200 dark:border-zinc-700">{children}</h2>,
                                                h3: ({children}) => <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2 mt-3 pb-2 border-b border-zinc-200 dark:border-zinc-700">{children}</h3>,
                                                h4: ({children}) => <h4 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-2 mt-3 pb-2 border-b border-zinc-200 dark:border-zinc-700">{children}</h4>,
                                                h5: ({children}) => <h5 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 mt-3 pb-2 border-b border-zinc-200 dark:border-zinc-700">{children}</h5>,
                                                h6: ({children}) => <h6 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 mt-3 pb-2 border-b border-zinc-200 dark:border-zinc-700">{children}</h6>,
                                                p: ({children}) => <p className="mb-3 text-zinc-600 dark:text-zinc-300 break-words">{children}</p>,
                                                ul: ({children}) => <ul className="list-disc list-inside mb-3 space-y-1 break-words">{children}</ul>,
                                                ol: ({children}) => <ol className="list-decimal list-inside mb-3 space-y-1 break-words">{children}</ol>,
                                                li: ({children}) => <li className="text-zinc-600 dark:text-zinc-300 break-words">{children}</li>,
                                                code: ({children}) => <code className="bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-sm font-mono break-all">{children}</code>,
                                                pre: ({children}) => <pre className="bg-zinc-200 dark:bg-zinc-700 p-3 rounded-lg overflow-x-auto mb-3 break-words whitespace-pre-wrap">{children}</pre>,
                                                blockquote: ({children}) => <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic text-zinc-600 dark:text-zinc-400 mb-3 break-words">{children}</blockquote>,
                                                a: ({children, href}) => <a href={href} className="text-indigo-600 dark:text-indigo-400 hover:underline break-all" target="_blank" rel="noopener noreferrer">{children}</a>,
                                                strong: ({children}) => <strong className="font-semibold text-zinc-900 dark:text-white break-words">{children}</strong>,
                                                em: ({children}) => <em className="italic break-words">{children}</em>,
                                            }}
                                        >
                                            {project.detailedDescription}
                                        </ReactMarkdown>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {/* 预览内容（未展开时显示） */}
                            {!isExpanded && (
                                <motion.div 
                                    className="text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/40 dark:border-zinc-700/40 mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <div className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                                        {project.detailedDescription.length > 200 
                                            ? `${project.detailedDescription.substring(0, 200)}...`
                                            : project.detailedDescription
                                        }
                                    </div>
                                </motion.div>
                            )}
                            
                            {/* 展开/收起按钮 */}
                            <div className="flex justify-center">
                                <motion.button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="cursor-pointer flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={isExpanded ? "收起详情" : "展开详情"}
                                >
                                    <AnimatePresence mode="wait">
                                        {isExpanded ? (
                                            <motion.div
                                                key="up"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronUpIcon className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="down"
                                                initial={{ rotate: 90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDownIcon className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
 
                {/* 评论测试区块 */}
                {userInfo && (
                    <motion.div
                        className="mt-6 rounded-xl p-4 sm:p-6 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-white/50 dark:border-zinc-700/50 shadow-sm"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <CommentSection 
                            title="讨论区（BETA）" 
                            projectId={id!}
                            currentUser={{
                                id: userInfo.data.id,
                                name: userInfo.data.name,
                                avatar: userInfo.data.avatar
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default BaseInfoProject;