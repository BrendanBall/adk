load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library")

go_library(
    name = "go_default_library",
    srcs = glob(["**/*.go"]),
    importpath = "github.com/brendanball/adk",
    deps = ["//server/http:go_default_library"],
    visibility = ["//visibility:private"],
)

go_binary(
    name = "adk",
    importpath = "github.com/brendanball/adk",
    library = ":go_default_library",
    visibility = ["//visibility:public"],
)
