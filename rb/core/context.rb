# UuidGenerator SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class UuidGeneratorContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = UuidGeneratorControl.new
    ctrl_raw = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = UuidGeneratorHelpers.to_map(UuidGeneratorHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = UuidGeneratorHelpers.to_map(UuidGeneratorHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = UuidGeneratorHelpers.to_map(UuidGeneratorHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = UuidGeneratorHelpers.to_map(UuidGeneratorHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(UuidGeneratorSpec) ? sp : basectx&.spec

    r = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(UuidGeneratorResult) ? r : basectx&.result

    rp = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(UuidGeneratorResponse) ? rp : basectx&.response

    opname = UuidGeneratorHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    return @opmap[opname] if @opmap[opname]
    return UuidGeneratorOperation.new({}) if opname.empty?

    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = UuidGeneratorOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[opname] = op
    op
  end

  def make_error(code, msg)
    UuidGeneratorError.new(code, msg, self)
  end
end
