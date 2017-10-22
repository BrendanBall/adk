package(default_visibility = ["//server:__pkg__"])
load("@io_bazel_rules_go//go:def.bzl", "go_library")


go_library(
    name = "go_default_library",
    srcs = glob(["**/*.go"]),
    importpath = "github.com/brendanball/adk/server/adk",
    deps = ["@com_github_satori_go_uuid//:go_default_library"],
)